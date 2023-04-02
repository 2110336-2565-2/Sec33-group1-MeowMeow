import React from "react";
import { List } from "@mui/material";
import { Booking } from "./Types";
import { CompletedRequestCard } from "./CompletedRequestCard";
const CompletedRequest = ({ bookings }: { bookings: Booking[] }) => {
  const filteredbooking = bookings.filter(
    (booking) => booking.bookingStatus == "FINISHED"
  );
  return (
    <div>
      <List>
        {filteredbooking.map((booking, index) => {
          return <CompletedRequestCard key={index} booking={booking} />;
        })}
      </List>
    </div>
  );
};

export default CompletedRequest;
