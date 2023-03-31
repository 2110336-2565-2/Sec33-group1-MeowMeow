import { REGISTER_GUIDE_INPUT_IDs } from "@/constants/RegisterGuidePage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IInputGuideRegister {
  location: string[];
  tourStyle: string[];
  certificate: File | undefined;
  brandBankAccount: string;
}

const useRegisterGuideForm = ({
  location,
  tourStyle,
  certificate,
  brandBankAccount,
}: IInputGuideRegister) => {
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
      }, {} as { [key: string]: any });

      formBody["location"] = location;
      formBody["tourStyle"] = tourStyle;
      formBody["certificate"] = certificate;
      formBody["brandBankAccount"] = brandBankAccount;

      const hasMissingValue = !!REGISTER_GUIDE_INPUT_IDs.find(
        (inputId: string) => {
          return !formBody[inputId] && !(inputId === "taxId");
        }
      );
      if (hasMissingValue || location.length === 0 || tourStyle.length === 0) {
        addNotification(
          "You must fill in every input field before submit the form.",
          "error"
        );
        return;
      }

      setLoading(true);

      console.log("formBody: ", formBody);
      var formData = new FormData();
      formData.append("certificate", certificate!);
      formData.append("locations", formBody["location"]);
      formData.append("tourStyles", formBody["tourStyle"]);
      formData.append("taxId", formBody["taxId"]);
      formData.append("brandBankAccount", formBody["brandBankAccount"]);
      formData.append("numberBankAccount", formBody["numberBankAccount"]);
      formData.append("nameBankAccount", formBody["nameBankAccount"]);

      console.log("formData: ", formData);

      try {
        // await apiClient.post("/guides/register", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        addNotification("Register Guide Success", "success");
        setTimeout(() => {
          // router.push("/dashboard");
        }, 2000);
      } catch (err) {
        const error = err as Error;
        addNotification(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [location, tourStyle, certificate]
  );

  return { isLoading, onSubmit };
};

export default useRegisterGuideForm;
