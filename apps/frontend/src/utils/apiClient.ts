import axios, { CreateAxiosDefaults } from "axios";
import { responseReject, responseSuccess } from "./interceptor";

console.log("process.env.backendBaseURL", process.env.backendBaseURL);
const createAxiosConfig = (): CreateAxiosDefaults<any> => {
  console.log("process.env.backendBaseURL", process.env.backendBaseURL);
  return {
    baseURL: process.env.backendBaseURL,
    withCredentials: true,
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccess, responseReject);

export default apiClient;
