// import { string } from "prop-types";

export interface ISession {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  time: Date;
  timeblock: string;
  address: string;
  city: string;
  activity1: string;
  activity2: string;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
}

export interface ISessionFormValues extends Partial<ISession> {
  time?: Date;
}

export class SessionFormValues implements ISessionFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  timeblock: string = "";
  address: string = "";
  city: string = "";
  activity1: string = "";
  activity2: string = "";

  constructor(init?: ISessionFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
}
