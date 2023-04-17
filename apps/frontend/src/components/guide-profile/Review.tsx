import { Grid, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import apiClient from "@/utils/apiClient";
interface IReviewProps {
  rating: number;
  timestamp: string;
  reviewerId: string;
  detail: string;
  newLimit: () => void;
  isLast: boolean;
}
const getReviewer = async (id: string) => {
  const response = await apiClient.get("users/" + id);
  return response.data.firstName + " " + response.data.lastName;
};
export default function Review({
  rating,
  timestamp,
  reviewerId,
  detail,
  newLimit,
  isLast,
}: IReviewProps) {
  dayjs.extend(relativeTime).locale(timestamp);
  var timeago = dayjs(timestamp).fromNow();

  const [reviewer, setReviewer] = useState("name");
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!reviewerId) return;
      const data = await getReviewer(reviewerId as string);
      setReviewer(data);
    };
    fetchUserProfile();
  }, [reviewerId]);

  const reviewRef = useRef(null);
  useEffect(() => {
    if (!reviewRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(reviewRef.current);
  }, [isLast]);
  return (
    <div ref={reviewRef}>
      <Grid
        container
        item
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
        width={{ xs: "85vw", sm: "55vw" }}
      >
        <Grid container direction="row">
          <Grid item marginRight="auto">
            <Rating
              value={rating}
              readOnly
              precision={0.5}
              icon={<StarIcon sx={{ fontSize: { xs: 14, sm: 20, md: 28 } }} />}
              emptyIcon={
                <StarIcon
                  sx={{ opacity: 1.0, fontSize: { xs: 14, sm: 20, md: 28 } }}
                />
              }
            />
          </Grid>
          <Grid item paddingRight={{ xs: "3vw", sm: "5vw", md: "3vw" }}>
            {" "}
            {timeago}
          </Grid>
          <Grid item paddingRight="1.5vw">
            {" "}
            {reviewer}
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            sx={{ wordBreak: "break-word" }}
            fontSize={{ xs: 12, sm: 14, md: 16 }}
          >
            {detail}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
