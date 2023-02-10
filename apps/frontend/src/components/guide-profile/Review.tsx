import { Grid, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
interface IReviewProps {
  rating: number;
  timestamp: string;
  reviewer: string;
  detail: string;
}
export default function Review({
  rating,
  timestamp,
  reviewer,
  detail,
}: IReviewProps) {
  dayjs.extend(relativeTime).locale(timestamp);
  var timeago = dayjs(timestamp).fromNow();

  return (
    <Grid
      container
      direction="column"
      bgcolor="#F3F4F6"
      borderRadius={5}
      color="#475569"
      fontFamily="Inter"
      fontWeight={400}
      fontSize={{ xs: 12, sm: 14, md: 16 }}
      lineHeight={{ xs: 1.5, md: 2 }}
      padding={{ xs: "6vw", sm: "4vw", md: "3vw" }}
      marginBottom="3vh"
    >
      <Grid container direction="row">
        <Grid item marginRight="auto">
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            icon={<StarIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />}
            emptyIcon={
              <StarIcon
                sx={{ opacity: 1.0, fontSize: { xs: 20, sm: 24, md: 28 } }}
              />
            }
          />
        </Grid>
        <Grid item paddingRight={{ xs: "7vw", sm: "5vw", md: "3vw" }}>
          {" "}
          {timeago}
        </Grid>
        <Grid item paddingRight="1.5vw">
          {" "}
          {reviewer}
        </Grid>
      </Grid>
      <Grid item>{detail}</Grid>
    </Grid>
  );
}
