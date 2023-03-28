import { ChipData } from "@/components/guide-register/form";
import { REGISTER_GUIDE_INPUT_IDs } from "@/constants/RegisterGuidePage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

var locationForm: string[] = [];
var tourStyleForm: string[] = [];
var imageUpload: File | undefined;

export const setLocationAndTourStyle = (
  location: readonly ChipData[],
  tourStyle: readonly ChipData[],
  image: File | undefined
) => {
  locationForm = location.map((data) => {
    return data.label;
  });
  tourStyleForm = tourStyle.map((data) => {
    return data.label;
  });
  imageUpload = image;
};

// function fileToString(file: File): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       const binaryString = reader.result as string;
//       resolve(binaryString);
//     };

//     reader.onerror = () => {
//       reject(reader.error);
//     };

//     reader.readAsBinaryString(file);
//   });
// }

interface IUseRegisterGuideForm {
  location: string[];
  tourStyle: string[];
  certificate: string;
  paymentId: string;
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

      // const fileInput = document.querySelector('#certificate')!
      // const formData = new FormData();

      // formData.append('file', fileInput.files[0]);

      // console.log("locationForm: ", locationForm);
      // console.log("tourStyleForm: ", tourStyleForm);
      // formBody["location"] = locationForm;
      // formBody["tourStyle"] = tourStyleForm.join(", ");
      // console.log("formBody: ", formBody);

      const hasMissingValue = !!REGISTER_GUIDE_INPUT_IDs.find(
        (inputId: string) => {
          return !formBody[inputId];
        }
      );
      if (
        hasMissingValue ||
        locationForm.length === 0 ||
        tourStyleForm.length === 0
      ) {
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

      var sending: IUseRegisterGuideForm = {} as IUseRegisterGuideForm;

      function fileToString(file: File): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = () => {
            const binaryString = reader.result as string;
            sending = {
              location: locationForm,
              tourStyle: tourStyleForm,
              certificate: binaryString,
              paymentId: formBody["bankAccount"],
            };

            console.log("sending: ", sending);
            apiClient
              .post("/guides/register", sending)
              .then((res) => {
                addNotification("Register Guide Success", "success");
                setTimeout(() => {
                  // router.push("/login");
                }, 2000);
                console.log("res: ", res);
                resolve();
              })
              .catch((err) => {
                const error = err as Error;
                addNotification(error.message, "error");
                reject();
              });
          };
          reader.onerror = () => {
            reject(reader.error);
          };
        });
      }

      fileToString(imageUpload!)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });

      // fileToString(imageUpload!).then((imageBinary) => {
      //   // console.log("data: ", imageBinary);
      //   sending = {
      //     location: locationForm,
      //     tourStyle: tourStyleForm,
      //     certificate: imageBinary,
      //     paymentId: formBody["bankAccount"],
      //   }
      // }).then(() => {
      // })

      // try {
      //   console.log("sending: ", sending);
      //   await apiClient.post("/guides/register", sending);
      //   addNotification("Register Guide Success", "success");
      //   setTimeout(() => {
      //     // router.push("/login");
      //   }, 2000);
      // } catch (err) {
      //   const error = err as Error;
      //   addNotification(error.message, "error");
      // } finally {
      //   setLoading(false);
      // }
    },
    []
  );

  return { isLoading, onSubmit };
};

export default useRegisterGuideForm;
