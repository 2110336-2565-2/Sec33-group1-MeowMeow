import useCancelTrip from "@/hooks/useCancelTrip";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import React from "react";

export default function CancelContent() {
  //const { isLoading, onSubmit } = useCancelTrip();
  const isLoading = false;
  const onSubmit = () => {};

  if (isLoading) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Cancel Pending...
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card sx={{ justifyContent: "center" }}>
      <CardContent>
        <Typography variant="h4">Are you sure to cancel this trip?</Typography>
        <br></br>
      </CardContent>
      <CardActions>
        <Stack
          component="form"
          direction="row"
          justifyContent="center"
          alignItems="center"
          onSubmit={onSubmit}
        >
          <Button size="large" type="submit" variant="contained">
            Confirm
          </Button>
        </Stack>
        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{ marginLeft: "10px" }}
          color="secondary"
          href="/traveller-record"
        >
          Back to my record
        </Button>
      </CardActions>
    </Card>
  );
}
