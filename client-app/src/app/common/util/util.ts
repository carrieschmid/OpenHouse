import { ISession, IAttendee } from "../../models/session";
import { IUser } from "../../models/user";

export const combinedDateAndTime = (date: Date, time: Date) => {
  const timeString1 = "0:00";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  //Safari fix
  // const dateString = date.toISOString().split("T")[0];
  // const timeString1 = "0:00";
  // return new Date(dateString + "T" + timeString);

  return new Date(dateString + "" + timeString1);
};

export const setSessionProps = (session: ISession, user: IUser) => {
  session.date = new Date(session.date);
  session.isGoing = session.attendees.some((a) => a.username === user.username);
  session.isHost = session.attendees.some(
    (a) => a.username === user.username && a.isHost
  );
  return session;
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image!
  };
};
