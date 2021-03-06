export interface IProfile {
  displayName: string;
  username: string;
  bio: string;
  interests: string;
  bgcheck: string;
  firstaid: string;
  terms: string;
  image: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface IUserSession {
  id: string;
  title: string;
  category: string;
  date: Date;
}
