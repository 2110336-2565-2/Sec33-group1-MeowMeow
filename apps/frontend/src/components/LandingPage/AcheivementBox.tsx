import theme from "@/config/theme";
import { Padding } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React from "react";

export default function AcheivementBox({ children }: any) {
  return (
    <Grid
      container
      sx={{
        width: 300,
        height: { xs: 300, sm: 350 },
        backgroundColor: "#ffffff",
        boxShadow: 5,
        borderRadius: "16px",
        padding: "10px",
        marginBottom: { xs: "25px", sm: "0px" },
      }}
    >
      {children}
    </Grid>
  );
}
