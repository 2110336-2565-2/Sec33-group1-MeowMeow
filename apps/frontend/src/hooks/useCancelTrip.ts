import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useContext, useState } from "react";

export interface IUseCancelTrip {
  tripId: number;
  handleClose: () => void;
}

const useCancelTrip = ({ tripId, handleClose }: IUseCancelTrip) => {
  const { addNotification } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      console.log("cancel trip");
      setLoading(true);
      try {
        await apiClient.post(`/bookings/${tripId}/cancel`);
        addNotification("Cancel success", "success");
        setTimeout(() => {
          handleClose();
          router.push("/traveller-record");
        }, 2000);
      } catch (err) {
        const error = err as Error;
        handleClose();
        router.push("/traveller-record");
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
