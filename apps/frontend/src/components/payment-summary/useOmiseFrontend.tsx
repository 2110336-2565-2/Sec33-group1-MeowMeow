import { useEffect, useState } from "react";
import type { OmiseCard as OmiseCardType } from "omise-js-typed";
import { PaymentStatus, Trip } from "./types";

if (!process.env.BACKEND_OMISE_PUBLIC_KEY) {
  throw new Error("BACKEND_OMISE_PUBLIC_KEY is not defined");
}

interface IOmiseFrontend {
  trip: Trip;
}

const useOmiseFrontend = (props: IOmiseFrontend) => {
  const { trip } = props;
  const [omiseCard, setOmiseCard] = useState<OmiseCardType | null>(null);
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.INITIAL);

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
      amount: Number(trip.price * 100), // tailing 2 digits are satang
      currency: "thb",
      frameLabel: "GuideKai Co.",
      frameDescription: `Trip #${trip.id}`,
      onCreateTokenSuccess: (nonce: string) => {
        setStatus(PaymentStatus.PENDING);
        // TODO: send token to backend
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
