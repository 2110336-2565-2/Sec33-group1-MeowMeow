<<<<<<< HEAD
import React from "react";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import Content from "@/components/managetrip-guide/Content";
import DashBoard from "@/components/Dashboard/DashBoard";

const ManageTripGuide = () => {
  return (
    <DashBoard roleAllowed={["GUIDE"]}>
      <Box sx={{ display: "flex", justifyContent: "center", paddingY: "5vh" }}>
        <Content></Content>
      </Box>
    </DashBoard>
  );
};

export default ManageTripGuide;
||||||| parent of f2437d0 (fix: move landing page to home page)
=======
import React from "react";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import Content from "@/components/managetrip-guide/Content";

const ManageTripGuide = () => {
  return(
    <>
    <Navbar/>
    <Box sx={{ display: "flex", justifyContent: "center", paddingY:"5vh" }}>
        <Content></Content>
      </Box>
    </>
  )
};

export default ManageTripGuide;
>>>>>>> f2437d0 (fix: move landing page to home page)
