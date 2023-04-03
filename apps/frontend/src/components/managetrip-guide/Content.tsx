import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AcceptedRequest from "./AcceptedRequest";
import NewRequest from "./NewRequest";
import { Request, ITabPanelProps, IContentProps, Booking } from "./Types";
import CanceledRequest from "./CanceledRequest";
import apiClient from "@/utils/apiClient";
import CompletedRequest from "./CompletedRequest";

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const postConfirm = async (booking: Booking) => {
  await apiClient.post("/bookings/" + booking.id + "/accept");
};
const postDecline = async (booking: Booking) => {
  await apiClient.post("/bookings/" + booking.id + "/decline");
};
const postCancel = async (booking: Booking) => {
  await apiClient.post("/bookings/" + booking.id + "/cancel");
};
const Content = ({ bookings, update, setUpdate }: IContentProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleConfirm = (booking: Booking) => {
    postConfirm(booking);
    setUpdate(update + 1);
  };
  const handleDecline = (booking: Booking) => {
    postDecline(booking);
    setUpdate(update + 1);
  };
  const handleCancel = (booking: Booking) => {
    postCancel(booking);
    setUpdate(update + 1);
  };

  return (
    <Box sx={{ width: { xs: "90%", sm: "85%", md: "60%" } }}>
      <Typography variant="h5" fontFamily="Inter" paddingY="1vh">
        {" "}
        Manage trips{" "}
      </Typography>
      <Typography variant="body2" fontFamily="Inter" paddingY="1vh">
        {" "}
        Guides can view all trip requests and manage them here
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="guide tabs"
        >
          <Tab
            label="New Requests"
            sx={{ fontSize: { xs: 13, sm: 16 } }}
            {...a11yProps(0)}
          />
          <Tab
            label="Accepted Requests"
            sx={{ fontSize: { xs: 13, sm: 16 } }}
            {...a11yProps(1)}
          />
          <Tab
            label="Canceled Requests"
            sx={{ fontSize: { xs: 13, sm: 16 } }}
            {...a11yProps(2)}
          />
          <Tab
            label="Completed Trips"
            sx={{ fontSize: { xs: 13, sm: 16 } }}
            {...a11yProps(3)}
          />
          cker
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewRequest
          bookings={bookings}
          handleConfirm={handleConfirm}
          handleDecline={handleDecline}
        ></NewRequest>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AcceptedRequest
          bookings={bookings}
          handleCancel={handleCancel}
        ></AcceptedRequest>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CanceledRequest bookings={bookings}></CanceledRequest>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompletedRequest bookings={bookings}></CompletedRequest>
      </TabPanel>
    </Box>
  );
};
export default Content;
