import { Typography, Button } from "@mui/material";
import Script from "next/script";
import { Trip } from "./types";
import useOmiseFrontend from "./useOmiseFrontend";

interface IPaymentOptionProps {
  trip: Trip;
  isGenerateToken: boolean;
  setIsGenerateToken: (isGenerateToken: boolean) => void;
}

const PaymentOption = (props: IPaymentOptionProps) => {
  const { trip, isGenerateToken, setIsGenerateToken } = props;
  const { handleScriptLoad, openPayModal } = useOmiseFrontend({
    trip,
    setIsGenerateToken,
  });

  return (
    <>
      <Script src="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />

      <Typography variant="h6">Payment Method</Typography>
      <Button
        variant="contained"
        sx={{
          color: "white",
          mt: 2,
        }}
        id="credit-card"
        className="btn"
        type="button"
        onClick={openPayModal}
      >
        Pay with Credit Card
      </Button>
    </>
  );
};
export default PaymentOption;
