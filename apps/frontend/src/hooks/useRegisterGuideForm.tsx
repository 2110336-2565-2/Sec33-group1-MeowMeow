import { ChipData } from "@/components/guide-register/form";
import { REGISTER_GUIDE_INPUT_IDs } from "@/constants/RegisterGuidePage";
import { REGISTER_INPUT_IDs } from "@/constants/RegisterPage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IUserRegisterGuideForm {
  location: ChipData[];
  tourStyle: ChipData[];
}

const useRegisterGuideForm = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = REGISTER_GUIDE_INPUT_IDs.reduce((prev, formId) => {
        return {
          ...prev,
          [formId]: event.currentTarget[formId]?.value,
        };
      }, {} as { [key: string]: string });

      console.log("formBody: ", formBody);

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

      setLoading(true);

      try {
        // await apiClient.post("/users/register", formBody);
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

export default useRegisterGuideForm;
