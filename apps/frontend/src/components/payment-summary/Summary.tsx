import { Divider, Stack, Typography } from "@mui/material";
import { Trip } from "./types";

interface ISummaryProps {
  trip: Trip;
}

const Summary = (props: ISummaryProps) => {
  const { trip } = props;

  return (
    <Stack gap={2}>
      <Typography variant="h4">Summary</Typography>
      <Stack direction={"row"} justifyContent="space-between" mt={1}>
        <Typography variant="h6">{trip.name}</Typography>
        <Typography variant="h6">{trip.price} ฿</Typography>
      </Stack>
      <Divider />
      <Typography
        variant="h6"
        sx={{
          alignSelf: "flex-end",
        }}
      >
        Total: {trip.price} ฿
      </Typography>
    </Stack>
  );
};
export default Summary;
