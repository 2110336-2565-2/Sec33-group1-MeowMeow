import React from "react";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import Content from "@/components/managetrip-guide/Content";
import AuthProvider from "@/context/AuthContext";

const ManageTripGuide = () => {
  return (
    <AuthProvider roleAllowed={["GUIDE"]}>
      <>
        <Navbar />
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingY: "5vh" }}
        >
          <Content></Content>
        </Box>
      </>
    </AuthProvider>
  );
};

export default ManageTripGuide;
