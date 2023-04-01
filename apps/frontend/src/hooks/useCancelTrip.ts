import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

const useCancelTrip = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        // await apiClient.delete("/users/register");
        addNotification("Cancel success", "success");
        setTimeout(() => {
          router.push("/traveller-record");
        }, 1000);
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

export default useCancelTrip;
