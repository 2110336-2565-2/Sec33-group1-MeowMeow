import { IEditForm } from "@/components/guide-post/editViewModel";
import { POST_INPUT_IDs } from "@/constants/PostPage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

interface IUsePostForm {
  methodType: "POST" | "PUT";
  formData: IEditForm;
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
          prev[formId] = formData.locations;
        } else if (formId === "tags") {
          prev[formId] = formData.tags;
        } else {
          prev[formId] = event.currentTarget[formId].value;
        }
        return prev;
      }, {} as { [key: string]: string | number | string[] });

      formBody["fee"] = Number(formBody["fee"]);
      formBody["maxParticipant"] = Number(formBody["maxParticipant"]);

      console.log("===> ", formBody);

      const hasMissingValue = !!POST_INPUT_IDs.find((inputId: string) => {
        return !formBody[inputId];
      });

      if (
        hasMissingValue ||
        formBody.location === 0 ||
        formBody.tourStyle === 0
      ) {
        addNotification(
          "You must fill in every input field before submit the form and select at least one location and tour style.",
          "error"
        );
        return;
      }
      if (formBody.fee <= 0 || formBody.maxParticipant <= 0) {
        addNotification(
          "Fee and max participant must be greater than 0",
          "error"
        );
        return;
      }

      setLoading(true);
      try {
        if (methodType === "PUT") {
          await apiClient.put("/posts/" + postID, formBody);
          addNotification("Post update success", "success");
          return;
        } else {
          await apiClient.post("/posts", formBody);
          addNotification("Post create success", "success");
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
