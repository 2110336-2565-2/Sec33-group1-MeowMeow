import useCancelTrip from "@/hooks/useCancelTrip";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";

export default function CancelContent() {
  const { isLoading, onSubmit } = useCancelTrip();

  useEffect(() => {}, []);

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
    <Stack
      component="form"
      direction="row"
      justifyContent="center"
      alignItems="center"
      onSubmit={onSubmit}
    >
      <Card sx={{ minWidth: 275, justifyContent: "center" }}>
        <CardContent>
          <Typography variant="body2">
            Are you sure to cancel this trip?
            <br></br>
          </Typography>
          <br></br>
          <Typography variant="h5" component="div">
            Trip's Name
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trip's Description
          </Typography>
          <Typography variant="body2">Price</Typography>
          <Typography variant="body2">Participant</Typography>
          <Typography variant="body2">StartDate - EndDate</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" type="submit">
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
