import { Avatar, Box, Chip, Grid } from "@mui/material";
import React from "react";
interface IProfileProps {
  name: string;
  imageurl: string;
  certificateId: string;
}
export default function Profile({
  name,
  imageurl,
  certificateId,
}: IProfileProps) {
  console.log(imageurl);
  return (
    <Grid
      container
      rowSpacing={4}
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center", md: "left" }}
    >
      <Grid
        item
        paddingX={{ xs: "5vw", md: "2vw", lg: "5vw" }}
        display="flex"
        justifyContent="center"
      >
        <Avatar
          src={process.env.backendBaseURL + "/media/" + imageurl}
          sx={{
            width: { xs: 160, sm: 200, md: 160, lg: 200 },
            height: { xs: 160, sm: 200, md: 160, lg: 200 },
          }}
        ></Avatar>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="column"
          fontFamily="Inter"
          fontStyle="normal"
          paddingX={{ xs: 0, sm: "3vw", md: 0 }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box fontWeight={600} fontSize={{ xs: 24, sm: 32 }}>
                {name}
              </Box>
            </Grid>
            <Grid item paddingLeft={"1vw"}>
              <Chip
                label="Guide"
                size="small"
                sx={{ fontFamily: "Inter", fontSize: { xs: 12, sm: 14 } }}
              />
            </Grid>
          </Grid>
          <Box
            fontWeight={400}
            fontSize={{ xs: 14, sm: 16, lg: 18 }}
            paddingTop={{ xs: "1vh", sm: "2vh" }}
          >
            {"The guide is qualified with a certification:"}
            <Avatar
              sx={{ width: 200, height: 140 }}
              variant="square"
              src={process.env.backendBaseURL + "/media/" + certificateId}
            ></Avatar>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
