import { Box, styled } from "@mui/material";
import React, { ReactNode } from "react";

interface IContainerGuideProps {
  children?: ReactNode;
}

const ResponsiveBox = styled(Box)(({ theme }) => {
  return {
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "24px",
      margin: "12px",
      borderRadius: "12px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "500px",
      padding: "32px",
      borderRadius: "16px",
    },
    [theme.breakpoints.up("md")]: {
      width: "720px",
      padding: "50px",
      borderRadius: "20px",
    },
  };
});

export default function ContainerGuideRecord({
  children,
}: IContainerGuideProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(90deg, #fff3d4 0%, #FAD0C4 99%, #FAD0C4 100%)",
        padding: "40px 20px",
      }}
    >
      <ResponsiveBox> {children} </ResponsiveBox>
    </Box>
  );
}
