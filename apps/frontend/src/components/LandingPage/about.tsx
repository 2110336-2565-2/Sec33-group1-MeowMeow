import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Button } from "@mui/material";
import Navbar from "./navbar";
import Image from "next/image";
import theme from "@/config/theme";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.primary["main"],
}));

export default function About() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          background: "#ffff",
          width: "window.innerWidth",
          paddingBottom: "50px",
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Box
            sx={{
              height: "600px",
              width: "auto",
              background: "linear-gradient(to right bottom, #FFFFFF, #fff3e0)",
              padding: "0px",
            }}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Navbar />
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ minHeight: "600px" }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={4}
                  columnSpacing={0}
                  paddingLeft={10}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    height={50}
                  ></Box>
                  <Grid item xs={3} style={{ minHeight: "40" }}>
                    <Item> Designed For Both Tourist and Guide </Item>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      height: "auto",
                      fontSize: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    Your Custom Trip!
                  </Grid>
                  <Grid item xs={3}>
                    More than 2 billion people over the countries use GuideKai
                    and enjoy with their trip
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      GET STARTED
                    </Button>
                    <Button variant="outlined">ABOUT</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  height={45}
                ></Box>
                <Image
                  src={"/landing/traveller_about.png"}
                  alt="user"
                  height={465}
                  width={540}
                  priority
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
