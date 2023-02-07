import React from "react";
import About from "@/components/LandingPage/about";
import Achievement from "@/components/LandingPage/achievement";
import Promotion from "@/components/LandingPage/promotion";
import Feature from "@/components/LandingPage/feature";
import FooterBar from "@/components/LandingPage/footerBar";
import { Grid } from "@mui/material";

export default function Landing() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <About />
      <Achievement />
      <Promotion />
      <Feature />
      <FooterBar />
    </Grid>
  );
}
