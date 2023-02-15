import { AxiosError, AxiosResponse, isAxiosError } from "axios";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = (error: Error) => {
  if (isAxiosError(error)) {
    const err: AxiosError<{ message: string }> = error;
    const { response } = err;
    if (response?.data?.message) {
      err.message = response.data.message;
      err.status = response.status;
      throw err;
    }
    throw err;
  }
  throw new Error(error.message);
};
