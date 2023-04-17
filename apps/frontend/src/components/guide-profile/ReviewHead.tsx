import { Button, Grid } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import StarAndBar from "./StarAndBar";
import ReviewDialog from "../review/dialog";
interface IReviewHeadProps {
  averageReviewScore: number;
}
export default function ReviewHead({ averageReviewScore }: IReviewHeadProps) {
  return (
    <Grid
      container
      fontFamily="Inter"
      fontStyle="normal"
      paddingX={{ xs: 0, sm: "3vw", md: 0 }}
      justifySelf="center"
      paddingTop={{ xs: "1.5vh", md: "2.5vh" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        fontWeight={600}
      >
        <Grid item fontSize={{ xs: 18, sm: 20 }}>
          {"Ratings & Reviews"}
        </Grid>
        <Grid item>
          <ReviewDialog />
        </Grid>
      </Grid>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
      >
        <Grid
          container
          item
          direction="column"
          xs={2}
          paddingLeft={{ xs: "3vw", sm: 0 }}
        >
          <Grid
            item
            fontSize={{ xs: 20, sm: 32, md: 42, lg: 50 }}
            textAlign="center"
          >
            {Math.round(averageReviewScore * 100) / 100}
          </Grid>
          <Grid
            item
            fontSize={{ xs: 12, sm: 16, md: 18, lg: 23 }}
            textAlign="center"
          >
            {"Out of 5"}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
