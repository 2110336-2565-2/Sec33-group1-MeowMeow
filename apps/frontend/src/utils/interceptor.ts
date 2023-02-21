import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import apiClient from "./apiClient";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = async (error: Error & { config: any }) => {
  const config = error?.config;
  if (isAxiosError(error)) {
    const err: AxiosError<{ message: string }> = error;
    const { response, status } = err;
    if (
      response?.status === 401 &&
      response.data.message === "access token is expired"
    ) {
      // TODO refresh access token after access token expired
      await apiClient.post("/auth/refresh");
      return await apiClient(config);
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
