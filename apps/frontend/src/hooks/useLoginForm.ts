import { ILoginForm } from "@/components/LoginPage/types/loginForm";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { useState, FormEventHandler, useCallback, useContext } from "react";

interface IUseLoginForm {}

const useLoginForm = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const email = event.currentTarget.email.value.toLowerCase();
      const password = event.currentTarget.password.value;
      try {
        if (!email || !password) {
          addNotification(
            "You must fill in every input field before submit the form.",
            "error"
          );
          return;
        }
        await apiClient.post<ILoginForm>("/auth/sign-in", {
          email,
          password,
        });
        addNotification("Login success.", "success");
        router.push("/dashboard");
      } catch (err) {
        const error = err as Error;
        addNotification(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { isLoading, onSubmit };
};

export default useLoginForm;
