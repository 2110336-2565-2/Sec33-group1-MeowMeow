import { BookRounded, LocationOn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

interface ICardContent {
  title: string;
  content: string;
  fee: number;
  locations: string[];
  maxParticipant: number;
}

export default function CardContent(props: ICardContent) {
  const { title, content, fee, locations, maxParticipant } = props;
  return (
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
  );
}
