import axios from "axios";
import getConfig from "next/config";
import { responseReject, responseSuccess } from "./interceptor";
const { publicRuntimeConfig } = getConfig();

const createAxiosConfig = () => {
  return {
    baseURL: publicRuntimeConfig.backendBaseURL,
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccess, responseReject);

export default apiClient;
