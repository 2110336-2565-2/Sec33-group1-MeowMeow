import { REGISTER_INPUT_IDs } from "@/constants/RegisterPage";
import apiClient from "@/utils/apiClient";
import { FormEventHandler, useCallback, useState } from "react";

interface IUseRegisterForm {
  onError: (message: string) => void;
}

const useRegisterForm = ({ onError }: IUseRegisterForm) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = REGISTER_INPUT_IDs.reduce((prev, formId) => {
        prev[formId] = event.currentTarget[formId].value;
        return prev;
      }, {} as { [key: string]: string });
      formBody["hashPassword"] = formBody["password"];
      if (formBody["password"] !== formBody["confirmPassword"]) {
        onError("Confirm password doesn't match with password");
        return;
      }
      setLoading(true);
      try {
        await apiClient.post("/users/register", formBody);
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

export default useRegisterForm;
