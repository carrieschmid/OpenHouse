import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { ISession } from "../models/session";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setSessionProps, createAttendee } from "../common/util/util";

export default class SessionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable sessionRegistry = new Map();
  @observable session: ISession | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;

  @computed get sessionsByDate() {
    return this.groupSessionsByDate(Array.from(this.sessionRegistry.values()));
  }

  groupSessionsByDate(sessions: ISession[]) {
    const sortedSessions = sessions.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedSessions.reduce((sessions, session) => {
        const date = session.date.toISOString().split("T")[0];
        sessions[date] = sessions[date]
          ? [...sessions[date], session]
          : [session];
        return sessions;
      }, {} as { [key: string]: ISession[] })
    );
  }

  @action loadSessions = async () => {
    this.loadingInitial = true;
    try {
      const sessions = await agent.Sessions.list();
      runInAction("loading Sessions", () => {
        sessions.forEach((session) => {
          setSessionProps(session, this.rootStore.userStore.user!);
          // this.session = session;
          this.sessionRegistry.set(session.id, session);
        });
        this.loadingInitial = false;
      });
      // console.log(this.groupsessionsByDate(sessions));
    } catch (error) {
      runInAction("load sessions error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadSession = async (id: string) => {
    let session = this.getSession(id);
    if (session) {
      this.session = session;
      return session;
    } else {
      this.loadingInitial = true;
      try {
        session = await agent.Sessions.details(id);
        runInAction("getting session", () => {
          setSessionProps(session, this.rootStore.userStore.user!);
          this.session = session;
          this.sessionRegistry.set(session.id, session);
          this.loadingInitial = false;
        });
        return session;
      } catch (error) {
        runInAction("get session error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearSession = () => {
    this.session = null;
  };

  getSession = (id: string) => {
    return this.sessionRegistry.get(id);
  };

  @action createSession = async (session: ISession) => {
    this.submitting = true;
    try {
      await agent.Sessions.create(session);
      console.log(session);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      let attendees = [];
      attendees.push(attendee);
      console.log(attendee);

      session.attendees = attendees;
      runInAction("creating session", () => {
        this.sessionRegistry.set(session.id, session);
        this.submitting = false;
      });
      history.push(`/sessions/${session.id}`);
    } catch (error) {
      runInAction("create session error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editSession = async (session: ISession) => {
    this.submitting = true;
    try {
      await agent.Sessions.update(session);
      runInAction("editing an session", () => {
        this.sessionRegistry.set(session.id, session);
        this.session = session;
        this.submitting = false;
      });
      history.push(`/sessions/${session.id}`);
    } catch (error) {
      runInAction("edit session error", () => {
        this.submitting = false;
      });

      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action deleteSession = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Sessions.delete(id);
      runInAction("deleting session", () => {
        this.sessionRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete session error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action attendSession = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Sessions.attend(this.session!.id);
      runInAction(() => {
        if (this.session) {
          this.session.attendees.push(attendee);
          this.session.isGoing = true;
          this.sessionRegistry.set(this.session.id, this.session);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });

      toast.error("Problem signing up to session");
    }
  };

  @action cancelAttendance = () => {
    try {
      agent.Sessions.unattend(this.session!.id);
      runInAction(() => {
        if (this.session) {
          this.session.attendees = this.session.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user!.username
          );
          this.session.isGoing = false;
          this.sessionRegistry.set(this.session.id, this.session);
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem cancelling attendance");
    }
  };
}
