import React from "react";
import { List } from "@mui/material";
import { ICanceledRequestProps } from "./Types";
import { CanceledRequestCard } from "./CanceledRequestCard";

const CanceledRequest = ({ bookings }: ICanceledRequestProps) => {
  const filteredbooking = bookings.filter(
    (booking) =>
      booking.bookingStatus == "GUIDE_CANCELLED" ||
      booking.bookingStatus == "USER_CANCELLED"
  );
  return (
    <div>
      <List>
        {filteredbooking.map((booking, index) => {
          return <CanceledRequestCard key={index} booking={booking} />;
        })}
      </List>
    </div>
  );
};
export default CanceledRequest;
