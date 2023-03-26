import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Navbar from "../common/Navbar";
import PaymentOption from "./PaymentOption";
import Summary from "./Summary";
import { Trip } from "./types";

const mockTrip: Trip = {
  id: "12faf3",
  name: "Tokyo Trip",
  price: 1200,
};

interface IPaymentSummaryProps {
  trip_id: string;
}

const PaymentSummary = (props: IPaymentSummaryProps) => {
  const { trip_id } = props;

  const fetchedTrip = useMemo(() => {
    return {
      ...mockTrip,
      id: trip_id,
    };
  }, [trip_id]);

  const [isGenerateToken, setIsGenerateToken] = useState<boolean>(false);
  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
        }}
      >
        {!isGenerateToken ? (
          <>
            <Summary trip={fetchedTrip} />
            <PaymentOption
              trip={fetchedTrip}
              isGenerateToken={isGenerateToken}
              setIsGenerateToken={setIsGenerateToken}
            />
          </>
        ) : (
          <Stack gap={8} p={8}>
            <LinearProgress />
            <Typography variant="h4" textAlign={"center"}>
              Payment Pending
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
};
export default PaymentSummary;
