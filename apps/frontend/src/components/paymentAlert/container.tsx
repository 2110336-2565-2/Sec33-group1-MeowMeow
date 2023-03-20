import { Box, Grid } from "@mui/material";
import React, { ReactNode } from "react";

interface IAlertContainerProps {
  children?: ReactNode;
}

export default function ContainerPaymentAlert({
  children,
}: IAlertContainerProps) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(90deg, #fff3d4 0%, #FAD0C4 89%, #FAD0C4 100%)",
        padding: "40px 20px",
      }}
    >
      {children}
    </Grid>
  );
}
