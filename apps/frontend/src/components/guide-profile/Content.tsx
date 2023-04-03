import { Grid } from "@mui/material";
import React from "react";
import Profile from "./Profile";
import Review from "./Review";
import ReviewHead from "./ReviewHead";
import Tags from "./Tags";
interface IReview {
  guideId: number;
  reviewId: number;
  reviewerId: string;
  score: number;
  publishDate: string;
  text: string;
}
interface IContentProps {
  name: string;
  certificateId: string;
  imageurl: string;
  tagsTourStyle: string[];
  tagsLocation: string[];
  reviews: IReview[];
  averageReviewScore: number;
  newLimit: () => void;
}
export default function Content({
  name,
  certificateId,
  imageurl,
  tagsTourStyle,
  tagsLocation,
  reviews,
  averageReviewScore,
  newLimit,
}: IContentProps) {
  return (
    <Grid
      container
      direction="column"
      width={{ xs: "85%", sm: "70%" }}
      rowSpacing={1}
      paddingTop={{ xs: "2vh", md: "3vh" }}
    >
      <Grid item paddingX={{ xs: 0, md: "5vw" }}>
        <Profile
          name={name}
          imageurl={imageurl}
          certificateId={certificateId}
        />
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
        paddingX={{ xs: 0, md: "5vw" }}
        paddingBottom={{ xs: "2vh", md: "3.5vh" }}
      >
        <ReviewHead averageReviewScore={averageReviewScore}></ReviewHead>
      </Grid>
      <Grid
        item
        justifyContent="center"
        paddingX={{ xs: 0, sm: "3vw", md: "5vw" }}
      >
        {reviews.map((review, index) => (
          <Review
            rating={review.score}
            timestamp={review.publishDate}
            reviewerId={review.reviewerId}
            detail={review.text}
            key={review.reviewId}
            newLimit={newLimit}
            isLast={index === reviews.length - 1}
          />
        ))}
      </Grid>
    </Grid>
  );
}
