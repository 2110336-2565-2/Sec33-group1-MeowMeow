import { Button, Grid } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import StarAndBar from "./StarAndBar";
interface IReviewHeadProps {
  reviewCount: number[];
}
export default function ReviewHead({ reviewCount }: IReviewHeadProps) {
  const total = reviewCount.reduce((total, p) => total + p);
  return (
    <Grid
      container
      fontFamily="Inter"
      fontStyle="normal"
      paddingTop={{ xs: "1vh", sm: "4vh" }}
      paddingX={{ xs: 0, sm: "3vw", md: 0 }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        fontWeight={600}
        paddingBottom={{ xs: "0", sm: "1.5vh" }}
      >
        <Grid item fontSize={{ xs: 18, sm: 20 }}>
          {" "}
          Ratings & Reviews
        </Grid>
        <Grid item>
          {" "}
          <Button
            variant="outlined"
            size="small"
            startIcon={<CreateIcon fontSize="inherit" />}
            sx={{ fontSize: { xs: 10, sm: 12, md: 16 } }}
          >
            {" "}
            WRITE REVIEW
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Grid
          container
          item
          direction="column"
          xs={2}
          paddingLeft={{ xs: "3vw", sm: 0 }}
        >
          <Grid item fontSize={{ xs: 32, sm: 40 }} textAlign="center">
            {" "}
            {total / 5}
          </Grid>
          <Grid item fontSize={16} textAlign="center">
            {" "}
            Out of 5
          </Grid>
        </Grid>
        <Grid item direction="column">
          {Array.from({ length: 5 }, (_, i) => (
            <StarAndBar star={5 - i} count={reviewCount[i]} total={total} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
