import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import ContainerPaymentAlert from "./container";
import CancelIcon from "@mui/icons-material/Cancel";
import theme from "@/config/theme";

export default function PaymentFail() {
  return (
    <ContainerPaymentAlert>
      <Card
        sx={{ textAlign: "center", alignItems: "center", width: "fit-content" }}
      >
        <CardContent>
          <CancelIcon
            sx={{
              color: theme.palette.error.main,
              width: "80px",
              height: "80px",
            }}
          />
          <Typography variant="h4" component="div">
            Payment Fail
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Your payment has been failed. Please try again.
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: theme.palette.error.main }}
            >
              Close
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </ContainerPaymentAlert>
  );
}
