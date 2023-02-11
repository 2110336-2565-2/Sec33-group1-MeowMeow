import { Avatar, Box, Chip, Grid } from "@mui/material";
import React from "react";
interface IProfileProps {
  name: string;
  imageurl: string;
  desc: string;
}
export default function Profile({ name, imageurl, desc }: IProfileProps) {
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
          src={imageurl}
          sx={{
            width: { xs: 160, sm: 200, md: 160, lg: 200 },
            height: { xs: 160, sm: 200, md: 160, lg: 200 },
          }}
        ></Avatar>
      </Grid>
      <Grid item xs>
        <Grid direction="column" fontFamily="Inter" fontStyle="normal">
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box fontWeight={600} fontSize={{ xs: 24, sm: 32 }}>
                {name}
              </Box>
            </Grid>
            <Grid item paddingLeft={"1vw"}>
              <Chip label="Guide" size="small" />
            </Grid>
          </Grid>
          <Box
            fontWeight={400}
            fontSize={{ xs: 16, lg: 18 }}
            paddingTop={{ xs: "1vh", sm: "2vh" }}
          >
            {desc}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
