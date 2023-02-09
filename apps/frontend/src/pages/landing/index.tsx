import React from "react";
import Hero from "@/components/LandingPage/Hero";
import About from "@/components/LandingPage/About";
import Acheivement from "@/components/LandingPage/Acheivement";
import Feature from "@/components/LandingPage/Feature";
import FooterBar from "@/components/LandingPage/FooterBar";
import { Container, Grid } from "@mui/material";

export default function Landing() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Hero />
      <About />
      <Acheivement />
      <Feature />
      <FooterBar />
    </Grid>
  );
}
