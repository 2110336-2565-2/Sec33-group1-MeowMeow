<<<<<<< HEAD
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AcceptedRequest from "./AcceptedRequest";
import NewRequest from "./NewRequest";
import Request, { TabPanelProps } from "./Types";

function TabPanel(props: TabPanelProps) {
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

const requests: Request[] = [
  {
    id: 1,
    customerName: "John",
    tripName: "Olympus",
    startDate: "2023-02-10",
    endDate: "2023-02-12",
    price: 200,
    numCustomer: 2,
    status: 0,
  },
  {
    id: 2,
    customerName: "Jane",
    tripName: "World's Edge",
    startDate: "2023-02-12",
    endDate: "2023-02-14",
    price: 300,
    numCustomer: 3,
    status: 1,
  },
  {
    id: 3,
    customerName: "Jack",
    tripName: "Storm Point",
    startDate: "2023-02-11",
    endDate: "2023-02-12",
    price: 400,
    numCustomer: 1,
    status: 1,
  },
];

const Content = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [confirmedRequests, setConfirmedRequests] = useState<Request[]>([]);
  const [cancelledRequests, setCancelledRequests] = useState<Request[]>([]);

  const handleConfirm = (request: Request) => {
    setConfirmedRequests([...confirmedRequests, request]);
  };

  const handleCancel = (request: Request) => {
    setCancelledRequests([...cancelledRequests, request]);
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
        <Tabs value={value} onChange={handleChange} aria-label="guide tabs">
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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewRequest
          requests={requests}
          confirmedRequests={confirmedRequests}
          cancelledRequests={cancelledRequests}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        ></NewRequest>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AcceptedRequest
          confirmedRequests={confirmedRequests}
          cancelledRequests={cancelledRequests}
          handleCancel={handleCancel}
        ></AcceptedRequest>
      </TabPanel>
    </Box>
  );
};
export default Content;
||||||| parent of f2437d0 (fix: move landing page to home page)
=======
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AcceptedRequest from "./AcceptedRequest";
import NewRequest from "./NewRequest";
import Request,{TabPanelProps} from "./Types";


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

const requests: Request[] = [
{   id: 1,
    customerName: "John",
    tripName: "Olympus",
    startDate: "2023-02-10",
    endDate: "2023-02-12",
    price:200,
    numCustomer:2,
    status:0 },
{   id: 2,
    customerName: "Jane",
    tripName: "World's Edge",
    startDate: "2023-02-12",
    endDate: "2023-02-14",
    price:300,
    numCustomer:3,
    status:1},
{   id: 3,
    customerName: "Jack",
    tripName: "Storm Point",
    startDate: "2023-02-11",
    endDate: "2023-02-12",
    price:400,
    numCustomer:1 ,
    status:1},
];

const Content = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [confirmedRequests, setConfirmedRequests] = useState<Request[]>([]);
    const [cancelledRequests, setCancelledRequests] = useState<Request[]>([]);

    const handleConfirm = (request: Request) => {
      setConfirmedRequests([...confirmedRequests, request]);
    };
  
    const handleCancel = (request: Request) => {
        setCancelledRequests([...cancelledRequests, request]);
    };

    return (
        <Box sx={{ width: {xs:'90%',sm:'85%',md:"60%"} }}>
            <Typography variant='h5' fontFamily="Inter" paddingY='1vh' > Manage trips </Typography>
            <Typography variant='body2' fontFamily="Inter"paddingY='1vh'> Guides can view all trip requests and manage them here</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="guide tabs" >
                    <Tab label="New Requests" sx={{fontSize:{ xs: 13, sm: 16}}} {...a11yProps(0)} />
                    <Tab label="Accepted Requests"sx={{fontSize:{ xs: 13, sm: 16}}} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <NewRequest requests={requests} confirmedRequests={confirmedRequests} cancelledRequests={cancelledRequests} handleConfirm={handleConfirm} handleCancel={handleCancel}></NewRequest>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AcceptedRequest confirmedRequests={confirmedRequests} cancelledRequests={cancelledRequests} handleCancel={handleCancel}></AcceptedRequest>
            </TabPanel>

        </Box>
    );
}
export default Content;
>>>>>>> f2437d0 (fix: move landing page to home page)
