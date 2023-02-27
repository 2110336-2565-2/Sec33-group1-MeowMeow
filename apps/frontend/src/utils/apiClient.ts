import axios, { CreateAxiosDefaults } from "axios";
import { responseReject, responseSuccess } from "./interceptor";

const createAxiosConfig = (): CreateAxiosDefaults<any> => {
  return {
    baseURL: process.env.backendBaseURL,
    withCredentials: true,
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccess, responseReject);

export default apiClient;
