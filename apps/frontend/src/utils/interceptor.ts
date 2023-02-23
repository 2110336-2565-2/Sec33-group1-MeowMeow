import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import apiClient from "./apiClient";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = async (error: Error) => {
  if (isAxiosError(error)) {
    const err: AxiosError<{ message: string }> = error;
    const { response, config } = err;
    console.log("response.status = ", response);
    if (response?.status === 401) {
      console.log("config = ", config);
      if (config && config.url !== "/auth/refresh") {
        console.log("can refresh");
        return await apiClient(config);
      }
      if (config && config.url === "/auth/refresh") {
        console.log("navigate to login");
        window.location.href = "/login";
      }
    }
    if (response?.data?.message) {
      err.message = response.data.message;
      err.status = response.status;
      throw err;
    }
    throw err;
  }
  throw new Error(error.message);
};
