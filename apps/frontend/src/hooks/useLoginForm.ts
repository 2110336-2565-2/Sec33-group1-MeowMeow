import { ILoginForm } from "@/components/LoginPage/types/loginForm";
import apiClient from "@/utils/apiClient";
import { useState, FormEventHandler, useCallback } from "react";

interface IUseLoginForm {
  onError: (message: string) => void;
}

const useLoginForm = ({ onError }: IUseLoginForm) => {
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
      } catch (err) {
        const error = err as Error;
        onError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { isLoading, onSubmit };
};

export default useLoginForm;
