import { ChipData } from "@/components/guide-register/form";
import { REGISTER_GUIDE_INPUT_IDs } from "@/constants/RegisterGuidePage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

var locationForm: string[] = [];
var tourStyleForm: string[] = [];

export const setLocationAndTourStyle = (
  location: readonly ChipData[],
  tourStyle: readonly ChipData[]
) => {
  locationForm = location.map((data) => {
    return data.label;
  });
  tourStyleForm = tourStyle.map((data) => {
    return data.label;
  });
};

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

      console.log("locationForm: ", locationForm);
      console.log("tourStyleForm: ", tourStyleForm);
      formBody["location"] = locationForm.join(", ");
      formBody["tourStyle"] = tourStyleForm.join(", ");
      console.log("formBody: ", formBody);

      const hasMissingValue = !!REGISTER_GUIDE_INPUT_IDs.find(
        (inputId: string) => {
          return !formBody[inputId];
        }
      );
      if (hasMissingValue) {
        addNotification(
          "You must fill in every input field before submit the form.",
          "error"
        );
        return;
      }

      if (formBody["bankAccount"].length !== 10) {
        addNotification("Bank account must be 10 digits.", "error");
        return;
      }

      const regX = /^[0-9]{10}$/;
      if (!regX.test(formBody["bankAccount"])) {
        console.log(formBody["bankAccount"]);
        addNotification(
          "Bank account must be 10 digits and consists of 0-9.",
          "error"
        );
        return;
      }

      setLoading(true);

      try {
        // await apiClient.post("/users/register", formBody);
        // addNotification("Register success", "success");
        setTimeout(() => {
          // router.push("/login");
        }, 2000);
      } catch (err) {
        const error = err as Error;
        // addNotification(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { isLoading, onSubmit };
};

export default useRegisterGuideForm;
