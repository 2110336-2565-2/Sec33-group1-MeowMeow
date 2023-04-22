import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Booking } from "./Types";
import apiClient from "@/utils/apiClient";
import dayjs from "dayjs";

const getTripInfo = async (id: string) => {
  const response = await apiClient.get("posts/" + id);
  return response.data;
};

export const CompletedRequestCard = ({ booking }: { booking: Booking }) => {
  const [fee, setFee] = useState(0);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getTripInfo(booking.postId.toString());
      setFee(data.fee);
      setTitle(data.title);
    };
    fetchInfo();
  }, []);
  return (
    <Card sx={{ marginBottom: "3vh" }} key={booking.id}>
      <CardContent>
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "flex-start", sm: "space-between" }}
        >
          <Grid item>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Reserver Name: {booking.firstName + " " + booking.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Reserved date:{" "}
              {dayjs(booking.startDate).format("DD-MM-YYYY hh:mmA") +
                " to " +
                dayjs(booking.endDate).format("DD-MM-YYYY hh:mmA")}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price: {fee}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
