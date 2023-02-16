import { ILoginForm } from "@/components/LoginPage/types/loginForm";
import apiClient from "@/utils/apiClient";
import { AlertColor } from "@mui/material";
import { useState, FormEventHandler, useCallback } from "react";

interface IUseLoginForm {
  onError: (message: string, severity: AlertColor) => void;
  onSuccess: (message: string, severity: AlertColor) => void;
}

const useLoginForm = ({ onError, onSuccess }: IUseLoginForm) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value;
      try {
        await apiClient.post<ILoginForm>("/auth/sign-in", {
          email,
          password,
        });
        onSuccess("Login success.", "success");
      } catch (err) {
        const error = err as Error;
        onError(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { isLoading, onSubmit };
};

export default useLoginForm;
