import { globalRouter } from "@/common/utils/globalRouter.ts";
import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:7542/2.0/"
      : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const instancePassRestore = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response.status === 401 && globalRouter.navigate) {
    //   globalRouter.navigate("/signin");
    // }
    // console.log("from interceptor", error);

    return Promise.reject(error);
  }
);
