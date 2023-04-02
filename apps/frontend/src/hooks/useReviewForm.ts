import { REVIEW_INPUT_IDs } from "@/constants/ReviewPage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

const useReviewForm = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const formBody = REVIEW_INPUT_IDs.reduce((prev, formId) => {
        prev[formId] = event.currentTarget[formId].value;
        return prev;
      }, {} as { [key: string]: string });

      formBody["guideId"] = router.query.id as string;
      // console.log("===> ", formBody); // debug purpose only

      if (formBody.score === "" || formBody.text === "") {
        addNotification(
          "You must fill in every input before submit the form.",
          "error"
        );
        return;
      }

      setLoading(true);

      try {
        const tmp = await apiClient.post("/reviews", {
          guideId: +formBody.guideId,
          score: +formBody.score,
          text: formBody.text,
        });
        // console.log("===> ", tmp); // debug purpose only
        addNotification("Review success", "success");
        setTimeout(() => {
          router.reload();
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

export default useReviewForm;
