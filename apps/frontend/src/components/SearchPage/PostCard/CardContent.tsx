import {
  BookRounded,
  Info,
  LocationOn,
  MonetizationOn,
  Person,
} from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface ICardContent {
  title: string;
  content: string;
  fee: number;
  locations: string[];
  maxParticipant: number;
  guideId: number;
  postId: number;
  travellerId: number;
  tags: string[];
}

const CardContent = (props: ICardContent) => {
  const {
    title,
    content,
    fee,
    locations,
    maxParticipant,
    travellerId,
    guideId,
    postId,
    tags,
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
        <PostHeader title={title} locations={locations} tags={tags} />
        <PostContent
          content={content}
          fee={fee}
          maxParticipant={maxParticipant}
        />
        <Button
          variant="contained"
          onClick={onOpen}
          sx={{
            mt: 2,
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
        guideId={guideId}
        postId={postId}
        travellerId={travellerId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default CardContent;

// component of Card

interface IPostContent {
  content: string;
  fee: number;
  maxParticipant: number;
}

const PostContent = (props: IPostContent) => {
  const { content, fee, maxParticipant } = props;
  return (
    <Stack gap={1}>
      <Stack direction={"row"} alignItems={"center"}>
        <Person fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2">
          Max Participant : {maxParticipant} person
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <MonetizationOn fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2">Fee : {fee} ฿</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Info fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2">Detail : </Typography>
      </Stack>
      <Typography variant="body2" noWrap>
        {content}
      </Typography>
    </Stack>
  );
};

interface IPostHeader {
  title: string;
  locations: string[];
  tags: string[];
}

const PostHeader = (props: IPostHeader) => {
  const { title, locations, tags } = props;
  return (
    <Box mb={2}>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">
          <LocationOn fontSize="inherit" sx={{ mr: 0.5 }} />
          {locations.join(", ")}
        </Typography>
      </Stack>
      <Stack gap={1} mt={1} direction={"row"}>
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}
      </Stack>
    </Box>
  );
};
