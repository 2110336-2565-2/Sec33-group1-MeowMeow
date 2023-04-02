import { useContext, useEffect, useState } from "react";
import type { OmiseCard as OmiseCardType } from "omise-js-typed";
import { PaymentStatus, ITrip, IBooking } from "./types";
import apiClient from "@/utils/apiClient";
import { NotificationContext } from "@/context/NotificationContext";
import { AxiosError } from "axios";

const testCreditCard = 4111111111111111;

if (!process.env.BACKEND_OMISE_PUBLIC_KEY) {
  throw new Error("BACKEND_OMISE_PUBLIC_KEY is not defined");
}

const payTrip = async (bookingId: number, nonce: string) => {
  const resp = await apiClient.post(`/bookings/${bookingId}/payment`, {
    token: nonce,
  });
  if (resp.status !== 201) {
    throw new Error(resp.data.message);
  }
  console.log(resp);
  return resp;
};

interface IOmiseFrontend {
  booking: IBooking;
}

const useOmiseFrontend = (props: IOmiseFrontend) => {
  const { booking } = props;
  const [omiseCard, setOmiseCard] = useState<OmiseCardType | null>(null);
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.INITIAL);

  const { addNotification } = useContext(NotificationContext);

  const handleScriptLoad = () => {
    console.log("Script loaded");
    setOmiseCard(window.OmiseCard);
  };

  useEffect(() => {
    omiseCard?.configure({
      publicKey: process.env.BACKEND_OMISE_PUBLIC_KEY || "",
    });
  }, [omiseCard]);

  const openPayModal = () => {
    omiseCard?.open({
      amount: Number(booking.post.price * 100), // tailing 2 digits are satang
      currency: "thb",
      frameLabel: "GuideKai Co.",
      frameDescription: `Trip #${booking.post.id}`,
      onCreateTokenSuccess: (nonce: string) => {
        setStatus(PaymentStatus.PENDING);

        payTrip(booking.id, nonce)
          .then(() => {
            setStatus(PaymentStatus.SUCCESS);
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              addNotification(err.message, "error");
            }
            setStatus(PaymentStatus.FAILED);
          });
      },
    });
  };
  return {
    handleScriptLoad,
    openPayModal,
    status,
  };
};
export default useOmiseFrontend;
