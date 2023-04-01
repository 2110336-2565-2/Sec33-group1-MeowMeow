import { IGetPost } from "@/components/guide-post/editViewModel";
import { POST_INPUT_IDs, METHOD_TYPE } from "@/constants/PostPage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IUsePostForm {
  methodType: METHOD_TYPE;
  formData: IGetPost;
}

export const usePostForm = ({ methodType, formData }: IUsePostForm) => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const postID = router.query.id?.toString();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formBody = POST_INPUT_IDs.reduce((prev, formId) => {
        if (formId === "locations") {
          prev[formId] = formData.locations as string[];
        } else if (formId === "tags") {
          prev[formId] = formData.tags as string[];
        } else {
          prev[formId] = event.currentTarget[formId].value.toString();
        }
        return prev;
      }, {} as { [key: string]: string | number | string[] });

      formBody["fee"] = Number(formBody["fee"]);
      formBody["maxParticipant"] = Number(formBody["maxParticipant"]);

      console.log("==Form Data==> ", formData);
      console.log("==Form Body==> ", formBody);

      const hasMissingValue = !!POST_INPUT_IDs.find((inputId: string) => {
        return !formBody[inputId];
      });

      if (
        hasMissingValue ||
        formData.locations.length === 0 ||
        formData.tags.length === 0
      ) {
        addNotification(
          "You must fill in every input field before submit the form and select at least one location and tour style.",
          "error"
        );
        return;
      }
      if (formBody.fee < 30 || formBody.maxParticipant <= 0) {
        addNotification(
          "max participant must be greater than 0 and fee must be greater than 30",
          "error"
        );
        return;
      }

      setLoading(true);
      try {
        if (methodType === METHOD_TYPE.PUT && postID !== "undefined") {
          await apiClient.put("/posts/" + postID, formBody);
          addNotification("Your Post is updated successfully", "success");
        } else {
          await apiClient.post("/posts", formBody);
          addNotification("Your Post is created successfully", "success");
        }
        setTimeout(() => {
          router.push("/guide-post/success");
        }, 2000);
      } catch (err) {
        const error = err as Error;
        addNotification(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [formData, postID]
  );

  return { isLoading, onSubmit };
};
