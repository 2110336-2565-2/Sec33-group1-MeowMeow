import { BookRounded, LocationOn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface ICardContent {
  title: string;
  content: string;
  fee: number;
  locations: string[];
  maxParticipant: number;
  authorId: number;
  postId: number;
  travellerId: number;
}

export default function CardContent(props: ICardContent) {
  const {
    title,
    content,
    fee,
    locations,
    maxParticipant,
    travellerId,
    authorId,
    postId,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box p={2} flexGrow={1}>
        <Box mb={2}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">
            <LocationOn fontSize="inherit" />
            {locations.join(", ")}
          </Typography>
        </Box>
        <Typography variant="body2">
          {" "}
          Max Participant :{maxParticipant} people
        </Typography>
        <Typography variant="body2">Fee : {fee} ฿</Typography>
        <Typography variant="body2">{content}</Typography>
        <Button
          variant="contained"
          onClick={onOpen}
          sx={{
            mt: 1,
            color: "white",
          }}
        >
          <Stack direction="row" gap={1}>
            <BookRounded />
            <Typography variant="body1">Book</Typography>
          </Stack>
        </Button>
      </Box>
      <BookingModal
        authorId={authorId}
        postId={postId}
        travellerId={travellerId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
