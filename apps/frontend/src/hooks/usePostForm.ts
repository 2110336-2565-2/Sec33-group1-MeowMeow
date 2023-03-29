import { ChipPostData } from "@/components/guide-post/postForm";
import { POST_INPUT_IDs } from "@/constants/PostPage";
import { NotificationContext } from "@/context/NotificationContext";
import { AlertColor } from "@mui/material";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IUsePostForm {
  methodType: "POST" | "PUT";
}

var locationForm: string[] = [];
var tourStyleForm: string[] = [];

export const setLocationAndTourStylePost = (
  location: readonly ChipPostData[],
  tourStyle: readonly ChipPostData[]
) => {
  locationForm = location.map((data) => {
    return data.label;
  });
  tourStyleForm = tourStyle.map((data) => {
    return data.label;
  });
};

const usePostForm = ({ methodType }: IUsePostForm) => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = POST_INPUT_IDs.reduce((prev, formId) => {
        console.log(formId);
        prev[formId] = event.currentTarget[formId].value;
        return prev;
      }, {} as { [key: string]: string | string[] });

      formBody["locations"] = locationForm;
      formBody["tags"] = tourStyleForm;

      console.log(formBody);

      //   formBody["hashPassword"] = formBody["password"];
      //   if (formBody["password"] !== formBody["confirmPassword"]) {
      //     onError("Confirm password doesn't match with password", "error");
      //     return;
      //   }
      //

      setLoading(true);
      try {
        // await apiClient.post("/users/register", formBody);
        addNotification("Register success", "success");
        setTimeout(() => {
          // router.push("/login");
        }, 2000);
      } catch (err) {
        const error = err as Error;
        addNotification("Register success", "success");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { isLoading, onSubmit };
};

export default usePostForm;
