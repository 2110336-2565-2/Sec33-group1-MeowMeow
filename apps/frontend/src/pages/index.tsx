import About from "@/components/LandingPage/About";
import Acheivement from "@/components/LandingPage/Acheivement";
import Feature from "@/components/LandingPage/Feature";
import FooterBar from "@/components/common/FooterBar";
import Hero from "@/components/LandingPage/Hero";
import { Grid } from "@mui/material";
import React from "react";

export default function Home() {
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
      <Hero />
      <About />
      <Acheivement />
      <Feature />
      <FooterBar />
    </Grid>
  );
}
