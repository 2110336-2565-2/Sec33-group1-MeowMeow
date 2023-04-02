import apiClient from "@/utils/apiClient";
import {
  FailedDisplay,
  PendingDisplay,
  SuccessDisplay,
} from "./StatusDisplayView";
import { CircularProgress, Container, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import PaymentOption from "./PaymentOption";
import Summary from "./Summary";
import { IBooking, PaymentStatus, ITrip } from "./types";
import useOmiseFrontend from "./useOmiseFrontend";
import AppSnackbar from "../common/AppSnackbar";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import { GetBookingsByGuideIdResponse } from "types";
import { NotificationContext } from "@/context/NotificationContext";
import { BookingStatus } from "../../../../../packages/database/src";

const fetchPost = async (postId: number) => {
  const resp = await apiClient.get(`/posts/${postId}`, {});
  const post: ITrip = {
    id: resp.data.id,
    name: resp.data.title,
    price: resp.data.fee,
  };
  return post;
};

const fetchBooking = async (bookingId: number) => {
  const resp = await apiClient.get(`/bookings/self`, {
    params: {
      offset: 0,
      limit: 100,
    },
  });
  const allBookings: GetBookingsByGuideIdResponse = resp.data;

  console.log(allBookings);

  const booking = allBookings.find((booking) => booking.id === bookingId);

  if (!booking) {
    throw new Error(`Booking with id ${bookingId} is not found`);
  }
  if (booking.bookingStatus !== BookingStatus.WAITING_FOR_PAYMENT) {
    throw new Error("You can't pay for this booking due to its booking status");
  }

  const post = await fetchPost(booking.postId);
  const formattedBooking: IBooking = {
    ...booking,
    post: {
      id: post.id,
      name: post.name,
      price: post.price,
    },
  };
  return formattedBooking;
};

interface IPaymentSummaryProps {
  booking_id: number;
}
const PaymentSummary = (props: IPaymentSummaryProps) => {
  const { booking_id } = props;
  const [booking, setBooking] = useState<IBooking>({} as IBooking);

  const { handleScriptLoad, openPayModal, status } = useOmiseFrontend({
    booking: booking,
  });
  const { isOpen, messageInfo, onClose, onExit } = useCustomSnackbar();
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    fetchBooking(booking_id)
      .then((booking) => {
        setBooking(booking);
      })
      .catch((err) => {
        if (err instanceof Error) {
          addNotification(err.message, "error");
        }
      });
  }, [booking_id]);

  if (!booking.post) {
    return (
      <>
        <Stack gap={4} m={16} alignItems={"center"}>
          <CircularProgress size={64} />
        </Stack>
        <AppSnackbar
          messageInfo={messageInfo}
          isOpen={isOpen}
          onClose={onClose}
          onExit={onExit}
        />
      </>
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
            <Summary trip={booking.post} />
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
      <AppSnackbar
        messageInfo={messageInfo}
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
      />
    </>
  );
};
export default PaymentSummary;
