import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const createAxiosConfig = () => {
  return {
    baseURL: publicRuntimeConfig.backendBaseURL,
  };
};

const apiClient = axios.create(createAxiosConfig());

export default apiClient;
