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
        {requests.map((request) => {
          if (
            confirmedRequests.some((confirmed) => confirmed.id === request.id)
          ) {
            return null;
          }
          if (
            cancelledRequests.some((cancelled) => cancelled.id === request.id)
          ) {
            return null;
          }
          return renderRequest(request);
        })}
      </List>
    </div>
  );
};

export default NewRequest;
