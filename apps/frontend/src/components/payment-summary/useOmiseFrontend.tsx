import { useEffect, useState } from "react";
import type { OmiseCard as OmiseCardType } from "omise-js-typed";
import { Trip } from "./types";

interface IOmiseFrontend {
  trip: Trip;
  setIsGenerateToken: (isGenerateToken: boolean) => void;
}

const useOmiseFrontend = (props: IOmiseFrontend) => {
  const { trip, setIsGenerateToken } = props;

  const [omiseCard, setOmiseCard] = useState<OmiseCardType | null>(null);

  const handleScriptLoad = () => {
    console.log("Script loaded");
    setOmiseCard(window.OmiseCard);
  };

  useEffect(() => {
    omiseCard?.configure({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY || "",
    });
  }, [omiseCard]);

  const openPayModal = () => {
    omiseCard?.open({
      amount: Number(trip.price * 100), // tailing 2 digits are satang
      currency: "thb",
      frameLabel: "GuideKai Co.",
      frameDescription: `Trip #${trip.id}`,
      onCreateTokenSuccess: (nonce: string) => {
        console.log("nonce", nonce);
        setIsGenerateToken(true);
        // TODO: send token to backend
      },
    });
  };
  return {
    handleScriptLoad,
    openPayModal,
  };
};
export default useOmiseFrontend;
