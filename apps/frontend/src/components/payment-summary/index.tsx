import apiClient from "@/utils/apiClient";
import {
  FailedDisplay,
  PendingDisplay,
  SuccessDisplay,
} from "./StatusDisplayView";
import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import PaymentOption from "./PaymentOption";
import Summary from "./Summary";
import { PaymentStatus, Trip } from "./types";
import useOmiseFrontend from "./useOmiseFrontend";

interface IPaymentSummaryProps {
  trip_id: string;
}

const testCreditCard = 4111111111111111;

const PaymentSummary = (props: IPaymentSummaryProps) => {
  const { trip_id } = props;
  const [trip, setTrip] = useState<Trip>({} as Trip);

  const { handleScriptLoad, openPayModal, status } = useOmiseFrontend({ trip });

  useEffect(() => {
    const fetchPost = async () => {
      const resp = await apiClient.get(`/posts/${trip_id}`, {});
      console.log(resp);
      const post: Trip = {
        id: resp.data.id,
        name: resp.data.title,
        price: resp.data.fee,
      };
      setTrip(post);
    };
    fetchPost();
  }, []);

  if (!trip) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
        }}
      >
        {status === PaymentStatus.INITIAL && (
          <>
            <Summary trip={trip} />
            <PaymentOption
              handleScriptLoad={handleScriptLoad}
              openPayModal={openPayModal}
            />
          </>
        )}
        {status === PaymentStatus.PENDING && <PendingDisplay />}
        {status === PaymentStatus.FAILED && <FailedDisplay />}
        {status === PaymentStatus.SUCCESS && <SuccessDisplay />}
      </Container>
    </>
  );
};
export default PaymentSummary;
