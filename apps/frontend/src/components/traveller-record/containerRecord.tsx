import { Box, Typography } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import Image from "next/image";

interface ITableRecordContainerProps {
  children?: ReactNode;
}

export default function ContainerTableRecord({
  children,
}: ITableRecordContainerProps) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(90deg, #fcc0c2 0%, #FAD0C4 99%, #FAD0C4 100%)",
        padding: "40px 20px",
      }}
    >
      {children}
    </Box>
  );
}
