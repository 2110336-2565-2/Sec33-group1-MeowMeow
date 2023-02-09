import React from "react";
import Hero from "@/components/LandingPage/Hero";
import Acheivement from "@/components/LandingPage/Acheivement";
import { Grid } from "@mui/material";
import About from "@/components/LandingPage/About";
import Feature from "@/components/LandingPage/Feature";
import FooterBar from "@/components/LandingPage/FooterBar";

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
