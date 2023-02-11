import { Grid } from "@mui/material";
import React from "react";
import Profile from "./Profile";
import Review from "./Review";
import ReviewHead from "./ReviewHead";
import Statistics from "./Statistics";
import Tags from "./Tags";
interface Ireview {
  rating: number;
  timestamp: string;
  reviewer: string;
  detail: string;
}
interface IContentProps {
  name: string;
  desc: string;
  imageurl: string;
  tagsTourStyle: string[];
  tagsLocation: string[];
  accept: number;
  total: number;
  reviewCount: number[];
  reviews: Ireview[];
}
export default function Content({
  name,
  desc,
  imageurl,
  tagsTourStyle,
  tagsLocation,
  accept,
  total,
  reviewCount,
  reviews,
}: IContentProps) {
  return (
    <Grid
      container
      direction="column"
      width={{ xs: "85%", sm: "70%" }}
      rowSpacing={1}
    >
      <Grid item paddingX={{ xs: 0, md: "5vw" }}>
        <Profile name={name} imageurl={imageurl} desc={desc} />
      </Grid>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 2, md: 1 }}
        justifyContent="space-between"
        paddingX={{ xs: 0, sm: "3vw", md: "5vw" }}
        paddingY={{ xs: "2vh", md: "3.5vh" }}
      >
        <Grid item md={5}>
          <Tags title={"Tour style"} tags={tagsTourStyle} />
        </Grid>
        <Grid item md={5}>
          <Tags title={"Location"} tags={tagsLocation} />
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="center"
        paddingX={{ xs: 0, sm: "3vw", md: "5vw" }}
      >
        <Statistics accept={accept} total={total} />
      </Grid>
      <Grid
        item
        justifyContent="center"
        paddingX={{ xs: 0, md: "5vw" }}
        paddingBottom={{ xs: "2vh", md: "3.5vh" }}
      >
        <ReviewHead reviewCount={reviewCount}></ReviewHead>
      </Grid>
      <Grid
        item
        justifyContent="center"
        paddingX={{ xs: 0, sm: "3vw", md: "5vw" }}
      >
        {reviews.map((review) => (
          <Review
            rating={review.rating}
            timestamp={review.timestamp}
            reviewer={review.reviewer}
            detail={review.detail}
            key={review.reviewer}
          />
        ))}
      </Grid>
    </Grid>
  );
}
