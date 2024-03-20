import axios from "axios";
import { appConfig } from "./app.config";

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  // timeout: appConfig.requestTimeOutSeconds,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("sms.currentUser"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosConfig;
