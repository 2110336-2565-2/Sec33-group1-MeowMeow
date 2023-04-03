import apiClient from "@/utils/apiClient";
import { Box, Button, Modal, Stack, Typography, styled } from "@mui/material";
import { CreateBookingRequest } from "types";
import Fade from "@mui/material/Fade";
import { useContext, useState } from "react";
import DateInput from "../FilterForm/DateInput";
import { NotificationContext } from "@/context/NotificationContext";

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  rowGap: "16px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: "12px",
    marginRight: "12px",
    padding: "32px 32px 12px 12px",
  },

  [theme.breakpoints.up("sm")]: {
    width: "500px",
    padding: "32px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "700px",
    padding: "32px",
  },
}));

interface IBookingModal {
  authorId: number;
  postId: number;
  travellerId: number;
  isOpen: boolean;
  onClose: () => void;
}

const createBooking = (body: CreateBookingRequest) => {
  return apiClient.post(`/bookings`, body);
};

const BookingModal = (props: IBookingModal) => {
  const { isOpen, onClose, authorId, postId, travellerId } = props;

  const { addNotification } = useContext(NotificationContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const bookingHandler = () => {
    createBooking({
      startDate: startDate!.toISOString(),
      endDate: endDate!.toISOString(),
      guideId: authorId,
      postId: postId,
    })
      .then((res) => {
        console.log(res);
        addNotification("Booking Success!", "success");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        addNotification("Booking Failed!", "error");
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        border: "none",
      }}
    >
      <Fade in={isOpen}>
        <ModalContainer>
          <Typography variant="h5" id="modal-modal-title">
            Booking : Select Date
          </Typography>
          <DateInput
            startDate={startDate}
            endDate={endDate}
            handleChangeStartDate={(date) => {
              setStartDate(date);
            }}
            handleChangeEndDate={(date) => {
              setEndDate(date);
            }}
          />
          <Stack gap={2} direction={"row"}>
            <Button
              variant="contained"
              onClick={bookingHandler}
              disabled={startDate === null || endDate === null}
              sx={{
                color: "white",
                width: "50%",
              }}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ width: "50%" }}>
              <Typography variant="body2">Cancel</Typography>
            </Button>
          </Stack>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default BookingModal;
