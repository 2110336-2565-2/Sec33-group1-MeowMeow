import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import ContainerPaymentAlert from "./container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PaymentSuccess() {
  return (
    <ContainerPaymentAlert>
      <Card
        sx={{ textAlign: "center", alignItems: "center", width: "fit-content" }}
      >
        <CardContent>
          <CheckCircleIcon />
          <Typography variant="h5" component="div">
            Payment Success
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Your payment has been successfully processed.
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "center" }}>
          <Button size="small" variant="contained">
            Done
          </Button>
        </CardActions>
      </Card>
    </ContainerPaymentAlert>
  );
}
