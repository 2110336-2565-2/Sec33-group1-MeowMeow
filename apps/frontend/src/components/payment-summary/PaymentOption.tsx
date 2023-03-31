import { Typography, Button } from "@mui/material";
import Script from "next/script";

interface IPaymentOptionProps {
  handleScriptLoad: () => void;
  openPayModal: () => void;
}

const PaymentOption = (props: IPaymentOptionProps) => {
  const { handleScriptLoad, openPayModal } = props;

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
