import axios, { AxiosResponse } from "axios";
import { ISession, ISessionsEnvelope } from "../models/session";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { IKid } from "../models/kid";
import { request } from "https";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "NetworkError" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error ="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again.");
  }
  if (
    error.response.status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),

  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/formdata" }
      })
      .then(responseBody);
  }
};

const Sessions = {
  list: (params: URLSearchParams): Promise<ISessionsEnvelope> =>
    axios
      .get("/sessions", { params: params })

      .then(responseBody),
  details: (id: string) => requests.get(`/sessions/${id}`),
  create: (session: ISession) => requests.post("/sessions", session),
  update: (session: ISession) =>
    requests.put(`/sessions/${session.id}`, session),
  delete: (id: string) => requests.del(`/sessions/${id}`),
  attend: (id: string) => requests.post(`/sessions/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/sessions/${id}/attend`)
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user)
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) =>
    requests.put(`/profiles`, profile),
  listSessions: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/sessions?predicate=${predicate}`)
};

// const Kids = {
//   getKid: (username: string): Promise<IKid> =>
//     requests.get(`/kids/${username}`),
//   addKid: (username: string): Promise<IKid> => requests.get(`/kids/${username}`)
// };

export default {
  Sessions,
  User,
  Profiles
  // Kids
};
