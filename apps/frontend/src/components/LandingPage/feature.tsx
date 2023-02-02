import { Box, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import theme from "@/config/theme";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PaymentIcon from "@mui/icons-material/Payment";
import FeatureBox from "./featureBox";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Feature() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
        backgroundColor: "#ffe9d6",
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={5}>
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} style={{ color: theme.palette.primary.main }}>
              Our Community
            </Grid>
            <Grid item xs={6} style={{ fontSize: "36px", fontWeight: "700" }}>
              Community Main Features
            </Grid>
            <Grid item xs={6} style={{ width: "500px", textAlign: "center" }}>
              The wise man therefore always holds in these matters to this
              principle of selection.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <FeatureBox
            id={1}
            title="Matchmaking"
            description="Members, Friends Connection ( like followers ), Private Message"
            icon={
              <GroupIcon
                style={{ width: "50px", height: "50px", color: "white" }}
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FeatureBox
            id={2}
            title="Searching"
            description="Your users can create groups to let other users to join and talk"
            icon={
              <SearchIcon
                style={{ width: "50px", height: "50px", color: "white" }}
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FeatureBox
            id={3}
            title="Chatting"
            description="Forum is ready by BBPress. Your users can make topics and talk."
            icon={
              <QuestionAnswerIcon
                style={{ width: "50px", height: "50px", color: "white" }}
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FeatureBox
            id={4}
            title="Payment"
            description="Lorem ipsum dolor sit amet consectetur. Id lorem augue ornare sit. Fusce eleifend."
            icon={
              <PaymentIcon
                style={{ width: "50px", height: "50px", color: "white" }}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
