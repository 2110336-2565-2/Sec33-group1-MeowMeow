import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Button } from "@mui/material";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.primary["main"],
}));

export default function Hero() {
  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          background: "linear-gradient(to right bottom, #FFFFFF, #fff3e0)",
        }}
      >
        <Navbar />
        <Container maxWidth={"xl"}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={6}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                sx={{
                  padding: {
                    xs: "32px",
                    lg: "0",
                  },
                }}
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
                  sx={{
                    height: "auto",
                    fontSize: { xs: "25px", sm: "50px" },
                    fontWeight: "bold",
                  }}
                >
                  Your Custom Trip!
                </Grid>
                <Grid item xs={3}>
                  More than 2 billion people over the countries use GuideKai and
                  enjoy with their trip
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" style={{ margin: "10px" }}>
                    GET STARTED
                  </Button>
                  <Button variant="outlined">ABOUT</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={6}
              sx={{
                display: { xs: "none", lg: "block" },
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  height={45}
                ></Box>
                <Image
                  src={"/landing/traveller.png"}
                  alt="user"
                  height={465}
                  width={540}
                  priority
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
