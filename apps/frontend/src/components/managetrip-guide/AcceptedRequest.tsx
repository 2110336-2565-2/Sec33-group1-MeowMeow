import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Typography,
} from "@mui/material";
import { IAcceptedRequestProps, Booking } from "./Types";
import { AcceptedRequestCard } from "./AcceptedRequestCard";

const AcceptedRequest = ({ bookings, handleCancel }: IAcceptedRequestProps) => {
  const [open, setOpen] = useState(false);
  const [curReq, setCurReq] = useState<Booking>({
    id: 0,
    bookingStatus: "",
    startDate: "",
    endDate: "",
    postId: 0,
    firstName: "",
    lastName: "",
  });
  const handleClick = (booking: Booking) => {
    setCurReq(booking);
    setOpen(true);
  };
  const handleYes = () => {
    handleCancel(curReq);
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };
  const filteredbooking = bookings.filter(
    (booking) =>
      booking.bookingStatus === "WAITING_FOR_PAYMENT" ||
      booking.bookingStatus === "WAITING_FOR_TRAVELING"
  );
  return (
    <div>
      <List>
        {filteredbooking.map((booking) => {
          return (
            <AcceptedRequestCard
              key={booking.id}
              booking={booking}
              handleClick={handleClick}
            />
          );
        })}
      </List>
      <Dialog open={open} onClose={handleNo}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            This process cannot be undone, are you sure you want to cancel this
            appointment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary" size="small">
            Yes
          </Button>
          <Button onClick={handleNo} color="primary" size="small">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptedRequest;
