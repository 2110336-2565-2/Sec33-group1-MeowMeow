import React from "react";
import About from "@/components/LandingPage/about";
import Achievement from "@/components/LandingPage/achievement";
import Promotion from "@/components/LandingPage/promotion";
import Feature from "@/components/LandingPage/feature";
import FooterBar from "@/components/LandingPage/footerBar";

export default function Landing() {
  return (
    <>
      <About />
      <Achievement />
      <Promotion />
      <Feature />
      <FooterBar />
    </>
  );
}
