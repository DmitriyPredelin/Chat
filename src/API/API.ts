import axios from "axios";

export const serverURL = "http://192.168.0.235:4000";
export const wsURL = "ws://192.168.0.235:5000";

const dalInstance = axios.create({
  withCredentials: true,
  headers: { UserName: "ADMIN" },
  baseURL: serverURL,
});

export const API = {
  getChannels: () => {
    return dalInstance.get("channels").then((res) => res.data);
  },
  getFriends: (profileId : number) => {
    return dalInstance.get(`friends/?profileId=${profileId}`).then((res) => res.data);
  },
  getProfile: (profileId : number) => {
    return dalInstance.get(`profile/?profileId=${profileId}`).then((res) => res.data);
  }
};
