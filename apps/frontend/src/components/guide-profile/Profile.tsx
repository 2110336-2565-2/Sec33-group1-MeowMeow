import { Avatar, Box, Button, Chip, Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              View Certificate{" "}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <Avatar
                sx={{ width: 600, height: 420 }}
                variant="square"
                src={process.env.backendBaseURL + "/media/" + certificateId}
              ></Avatar>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
