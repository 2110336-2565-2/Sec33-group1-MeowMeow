import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import apiClient from "./apiClient";
import checkRefresh from "./checkRefresh";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = async (error: Error) => {
  if (isAxiosError(error)) {
    const err: AxiosError<{ message: string }> = error;
    const { response, config } = err;
    const isRefresh = checkRefresh(config?.url || "");
    if (response?.status === 401) {
      if (config && isRefresh) {
        await apiClient.post("/auth/refresh");
        return await apiClient(config);
      }
      if (config && config.url !== "/auth/sign-in") {
        window.location.href = "";
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
