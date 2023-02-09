import React from "react";
import Hero from "@/components/LandingPage/Hero";
import About from "@/components/LandingPage/About";
import Acheivement from "@/components/LandingPage/Acheivement";
import Feature from "@/components/LandingPage/Feature";
import FooterBar from "@/components/LandingPage/FooterBar";
import { Grid } from "@mui/material";
import Navbar from "@/components/LandingPage/Navbar";

export default function Landing() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        gap: {
          xs: 6,
          sm: 12,
        },
      }}
    >
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Acheivement />
      <Feature />
      <FooterBar />
    </Grid>
  );
}
