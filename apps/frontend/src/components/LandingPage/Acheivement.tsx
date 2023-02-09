import { Button, Grid, Container, Paper, styled } from "@mui/material";
import React from "react";
import theme from "@/config/theme";
import PromotionBox from "./promotionBox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

<<<<<<< HEAD
export default function Promotion() {
    return (
        <Grid
            maxWidth="xl"
            container
            justifyContent="center"
            alignItems="center"
            columnGap={5}
            style={{ padding: "10px" }}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
=======
export default function Acheivement() {
  return (
    <Grid
      maxWidth="xl"
      container
      sx={{
        flexDirection: {
          xs: "column-reverse",
          sm: "row",
        },
        padding: "10px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          height: "auto",
          padding: { xs: "10px", sm: "0px" },
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <AcheivementBox>
            <Grid
              container
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                paddingBottom: "25px",
                height: "auto",
              }}
            >
              <StarBorderIcon style={{ color: theme.palette.primary.main }} />{" "}
              4.8 Rating
            </Grid>
            <Grid container style={{ paddingBottom: "15px" }}>
              <GroupsIcon />{" "}
              <span style={{ color: theme.palette.primary.main }}>
                {" "}
                +800k &nbsp;{" "}
              </span>{" "}
              Members
            </Grid>
            <Grid container style={{ paddingBottom: "30px" }}>
              More than 2 billion people in thailand using Guidekai to find the
              matched guide
            </Grid>
            <Grid container style={{ color: theme.palette.primary.main }}>
              <Button variant="text">
                Join Our Community <ArrowForwardIcon />{" "}
              </Button>
            </Grid>
          </AcheivementBox>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ height: "auto" }}>
        <Grid container justifyContent="center" alignItems="center">
          <AcheivementBox>
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
              <GitHubIcon style={{ color: theme.palette.primary.main }} /> Best
              2021 Github
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
          </AcheivementBox>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          padding: {
            xs: "32px",
            sm: "0",
          },
        }}
      >
        <Grid
          container
          style={{ paddingBottom: "5px", color: theme.palette.primary.main }}
          sx={{}}
>>>>>>> 3579ffc (fix: add responsive to hero,about + edit overview of responsive at mobile)
        >
            <Grid item sm={3} xs={12} sx={{ height: "auto" }}>
                <Grid container justifyContent="center" alignItems="center">
                    <PromotionBox>
                        <Grid
                            container
                            style={{
                                fontSize: "25px",
                                fontWeight: "bold",
                                paddingBottom: "25px",
                                height: "auto",
                            }}
                        >
                            <StarBorderIcon style={{ color: theme.palette.primary.main }} />{" "}
                            4.8 Rating
                        </Grid>
                        <Grid container style={{ paddingBottom: "15px" }}>
                            <GroupsIcon />{" "}
                            <span style={{ color: theme.palette.primary.main }}>
                                {" "}
                                +800k &nbsp;{" "}
                            </span>{" "}
                            Members
                        </Grid>
                        <Grid container style={{ paddingBottom: "30px" }}>
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
            </Grid>
            <Grid item sm={3} xs={12} sx={{ height: "auto" }}>
                <Grid container justifyContent="center" alignItems="center">
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
                            <GitHubIcon style={{ color: theme.palette.primary.main }} /> Best
                            2021 Github
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
            </Grid>
            <Grid item sm={4} xs={12}>
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
