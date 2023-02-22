import axios, { CreateAxiosDefaults } from "axios";
import getConfig from "next/config";
import { responseReject, responseSuccess } from "./interceptor";
const { publicRuntimeConfig } = getConfig();

const createAxiosConfig = (): CreateAxiosDefaults<any> => {
  return {
    baseURL: publicRuntimeConfig.backendBaseURL,
    withCredentials: true,
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccess, responseReject);

export default apiClient;
