import { Typography } from "@mui/material";
import React from "react";
import ContainerGuideRecord from "./containerRecord";
import GuideRegisterForm from "./form";

export default function GuideRegisterComponent() {
  return (
    <ContainerGuideRecord>
      <Typography variant="h5" fontWeight="600" marginBottom={"40px"}>
        Register as Guide
      </Typography>

      <GuideRegisterForm />
    </ContainerGuideRecord>
  );
}
