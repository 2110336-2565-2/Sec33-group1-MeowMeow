import theme from "@/config/theme";
import { Padding } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

export default function PromotionBox({ children }: any) {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: "#ffffff",
        boxShadow: 5,
        borderRadius: "16px",
        padding: "10px",
      }}
    >
      {children}
    </Box>
  );
}
