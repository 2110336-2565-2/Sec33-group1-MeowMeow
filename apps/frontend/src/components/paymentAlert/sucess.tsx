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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "@/config/theme";

export default function PaymentSuccess() {
  return (
    <ContainerPaymentAlert>
      <Card sx={{ textAlign: "center", width: "fit-content" }}>
        <CardContent>
          <CheckCircleIcon
            sx={{
              color: theme.palette.success.main,
              width: "80px",
              height: "80px",
            }}
          />
          <Typography variant="h4" component="div">
            Payment Success
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Your payment has been successfully processed.
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
              sx={{ backgroundColor: theme.palette.success.main }}
            >
              Done
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </ContainerPaymentAlert>
  );
}
