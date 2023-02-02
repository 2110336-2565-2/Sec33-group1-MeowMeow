import { Button, Grid } from "@mui/material";
import React from "react";
import theme from "@/config/theme";
import PromotionBox from "./promotionBox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Promotion() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      columnGap={5}
      style={{ padding: "10px" }}
    >
      <Grid item xs={3}>
        <PromotionBox>
          <Grid
            container
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              paddingBottom: "25px",
            }}
          >
            <StarBorderIcon style={{ color: theme.palette.primary.main }} /> 4.8
            Rating
          </Grid>
          <Grid container style={{ paddingBottom: "15px" }}>
            <GroupsIcon />{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {" "}
              +800k &nbsp;{" "}
            </span>{" "}
            Members
          </Grid>
          <Grid container style={{ paddingBottom: "35px" }}>
            More than 2 billion people in thailand using Guidekai to find the
            matched guide
          </Grid>
          <Grid container style={{ color: theme.palette.primary.main }}>
            <Button variant="text">
              Join Our Community <ArrowForwardIcon />{" "}
            </Button>
          </Grid>
        </PromotionBox>
      </Grid>
      <Grid item xs={3}>
        <PromotionBox>
          <Grid
            container
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              paddingBottom: "25px",
            }}
          >
            <EmojiEventsIcon style={{ color: theme.palette.primary.main }} />{" "}
            Awards
          </Grid>
          <Grid container style={{ paddingBottom: "15px" }}>
            <GitHubIcon style={{ color: theme.palette.primary.main }} /> Best of
            2021 on Github
          </Grid>
          <Grid container style={{ paddingBottom: "35px" }}>
            Guidekai is voted as the popular project on Github in 2021 and won
            the best new project 2021 award
          </Grid>
          <Grid container style={{}}>
            <Button variant="text">
              Go To Awards <ArrowForwardIcon />{" "}
            </Button>
          </Grid>
        </PromotionBox>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          style={{ paddingBottom: "5px", color: theme.palette.primary.main }}
        >
          Our Achievement
        </Grid>
        <Grid
          container
          style={{
            paddingBottom: "15px",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          We connect You to The Adventure Life
        </Grid>
        <Grid container style={{ paddingBottom: "35px" }}>
          Guidekai aims to be the friend of your trip. We take care of your
          journey at every step to ensure you feel comfortable.
        </Grid>
        <Grid container style={{}}>
          <Button variant="contained"> Discover more </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
