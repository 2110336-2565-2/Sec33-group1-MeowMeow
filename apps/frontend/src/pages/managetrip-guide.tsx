import React from "react";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import Content from "@/components/managetrip-guide/Content";

const ManageTripGuide = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", paddingY: "5vh" }}>
        <Content></Content>
      </Box>
    </>
  );
};

export default ManageTripGuide;
