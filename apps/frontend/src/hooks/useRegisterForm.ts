import { REGISTER_INPUT_IDs } from "@/constants/RegisterPage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IUseRegisterForm {}

const useRegisterForm = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = REGISTER_INPUT_IDs.reduce((prev, formId) => {
        if (formId === "email") {
          return {
            ...prev,
            [formId]: event.currentTarget[formId].value.toLowerCase(),
          };
        }
        return {
          ...prev,
          [formId]: event.currentTarget[formId].value,
        };
      }, {} as { [key: string]: string });
      formBody["hashPassword"] = formBody["password"];
      const hasMissingValue = !!REGISTER_INPUT_IDs.find((inputId: string) => {
        return !formBody[inputId];
      });

      if (hasMissingValue) {
        addNotification(
          "You must fill in every input field before submit the form.",
          "error"
        );
        return;
      }

      if (formBody["password"] !== formBody["confirmPassword"]) {
        addNotification(
          "Confirm password doesn't match with password",
          "error"
        );
        return;
      }
      setLoading(true);
      try {
        await apiClient.post("/users/register", formBody);
        addNotification("Register success", "success");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

export default useRegisterForm;
