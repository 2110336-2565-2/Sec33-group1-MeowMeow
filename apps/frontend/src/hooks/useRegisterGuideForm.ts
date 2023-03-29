import { REGISTER_GUIDE_INPUT_IDs } from "@/constants/RegisterGuidePage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IInputGuideRegister {
  location: string[];
  tourStyle: string[];
  certificate: File | undefined;
}

interface IUseRegisterGuideForm {
  locations: string[];
  tourStyles: string[];
  certificate: BinaryData;
  paymentId: string;
}

const useRegisterGuideForm = ({
  location,
  tourStyle,
  certificate,
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

      console.log("===> ", formBody);

      const hasMissingValue = !!REGISTER_GUIDE_INPUT_IDs.find(
        (inputId: string) => {
          return !formBody[inputId];
        }
      );
      if (hasMissingValue || location.length === 0 || tourStyle.length === 0) {
        addNotification(
          "You must fill in every input field before submit the form.",
          "error"
        );
        return;
      }

      if (formBody["paymentId"].length !== 10) {
        addNotification("Bank account must be 10 digits.", "error");
        return;
      }

      const regX = /^[0-9]{10}$/;
      if (!regX.test(formBody["paymentId"])) {
        console.log(formBody["paymentId"]);
        addNotification(
          "Bank account must be 10 digits and consists of 0-9.",
          "error"
        );
        return;
      }

      setLoading(true);

      var sending: IUseRegisterGuideForm = {} as IUseRegisterGuideForm;

      // function fileToString(file: File): Promise<void> {
      //   return new Promise<void>((resolve, reject) => {
      //     const reader = new FileReader();

      //     reader.onload = () => {
      //       const buffer = reader.result as BinaryData;

      //       sending = {
      //         locations: formBody["location"],
      //         tourStyles: formBody["tourStyle"],
      //         certificate: buffer,
      //         paymentId: formBody["paymentId"],
      //       };

      //       console.log("sending: ", sending);
      //       apiClient
      //         .post("/guides/register", sending, {
      //           headers: {
      //             "Content-Type": "multipart/form-data",
      //           }}
      //         )
      //         .then((res) => {
      //           addNotification("Register Guide Success", "success");
      //           setTimeout(() => {
      //             // router.push("/login");
      //           }, 2000);
      //           console.log("res: ", res);
      //           resolve();
      //         })
      //         .catch((err) => {
      //           const error = err as Error;
      //           addNotification(error.message, "error");
      //           reject();
      //         });
      //     };
      //     reader.onerror = () => {
      //       reject(reader.error);
      //     };

      //     reader.readAsDataURL(file)
      //   });
      // }

      // fileToString(certificate!)
      //   .then(() => {
      //     setLoading(false);
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      console.log("formBody: ", formBody);
      var formData = new FormData();
      formData.append("certificate", certificate!);
      formData.append("locations", formBody["location"]);
      formData.append("tourStyles", formBody["tourStyle"]);
      formData.append("paymentId", formBody["paymentId"]);

      try {
        await apiClient.post("/guides/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        addNotification("Register Guide Success", "success");
        setTimeout(() => {
          // router.push("/login");
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
