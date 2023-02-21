import { REGISTER_INPUT_IDs } from "@/constants/RegisterPage";
import apiClient from "@/utils/apiClient";
import { AlertColor } from "@mui/material";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";

interface IUseRegisterForm {
  onError: (message: string, severity: AlertColor) => void;
  onSuccess: (message: string, severity: AlertColor) => void;
}

const useRegisterForm = ({ onError, onSuccess }: IUseRegisterForm) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = REGISTER_INPUT_IDs.reduce((prev, formId) => {
        prev[formId] = event.currentTarget[formId].value;
        return prev;
      }, {} as { [key: string]: string });
      formBody["hashedPassword"] = formBody["password"];
      if (formBody["password"] !== formBody["confirmPassword"]) {
        onError("Confirm password doesn't match with password", "error");
        return;
      }
      setLoading(true);
      try {
        await apiClient.post("/users/register", formBody);
        onSuccess("Register success", "success");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

export default useRegisterForm;
