import React from "react";
import { List } from "@mui/material";
import { INewRequestProps } from "./Types";
import { NewRequestCard } from "./NewRequestcard";

const NewRequest = ({
  bookings,
  handleConfirm,
  handleDecline,
}: INewRequestProps) => {
  const filteredbooking = bookings.filter(
    (booking) => booking.bookingStatus === "WAITING_FOR_GUIDE_CONFIRMATION"
  );
  return (
    <div>
      <List>
        {filteredbooking.map((booking) => {
          return (
            <NewRequestCard
              key={booking.id}
              booking={booking}
              handleConfirm={handleConfirm}
              handleDecline={handleDecline}
            />
          );
        })}
      </List>
    </div>
  );
};

export default NewRequest;
