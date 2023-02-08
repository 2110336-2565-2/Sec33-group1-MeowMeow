import { Box, Container, Grid } from "@mui/material";
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
        paddingBottom: "150px",
        background:
          "linear-gradient(0deg, rgba(241, 246, 253, 0) 1.63%, #FDF8F1 20.5%, #FFF2E6 58.57%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container rowSpacing={5} columnSpacing={5} maxWidth="xl">
          <Grid item xs={12}>
            <Grid
              container
              rowSpacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} style={{ color: theme.palette.primary.main }}>
                Our Website
              </Grid>
              <Grid item xs={6} style={{ fontSize: "36px", fontWeight: "700" }}>
                Website Main Features
              </Grid>
              <Grid item xs={6} style={{ width: "500px", textAlign: "center" }}>
                This website has four main features which were developed by our
                experienced IT team to make you feel satisfied.
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FeatureBox
              id={1}
              title="Matchmaking"
              description="This application allow you to find your guide by using our matchmaking algorithm"
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
              description="You can search your guide by using our search engine."
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
              description="You can chat with your guide or traveller by using our chatting system."
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
              description="Payment system is available for you to pay your guide."
              icon={
                <PaymentIcon
                  style={{ width: "50px", height: "50px", color: "white" }}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
