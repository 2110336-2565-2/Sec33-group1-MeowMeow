import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Content from "@/components/managetrip-guide/Content";
import DashBoard from "@/components/Dashboard/DashBoard";
import apiClient from "@/utils/apiClient";
import { Booking } from "@/components/managetrip-guide/Types";

const getGuideId = async () => {
  const response = await apiClient.get("/guides/profile");
  return response.data.userId;
};
const getData = async (id: string) => {
  const response = await apiClient.get(
    "bookings/guide/" + id + "?offset=0&limit=1000000"
  );
  return response;
};
const ManageTripGuide = () => {
  const [update, setUpdate] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const id = await getGuideId();
      const data = await getData(id);
      setBookings(data.data.bookings);
    };
    fetchBookings();
  }, [update]);
  return (
    <DashBoard roleAllowed={["GUIDE"]}>
      <Box sx={{ display: "flex", justifyContent: "center", paddingY: "5vh" }}>
        <Content
          bookings={bookings}
          update={update}
          setUpdate={setUpdate}
        ></Content>
      </Box>
    </DashBoard>
  );
};

export default ManageTripGuide;
