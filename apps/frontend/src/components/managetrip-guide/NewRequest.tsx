<<<<<<< HEAD
import React, { useState } from "react";
import {
  List,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Request, { INewRequestProps } from "./Types";

const NewRequest = ({
  requests,
  confirmedRequests,
  cancelledRequests,
  handleConfirm,
  handleCancel,
}: INewRequestProps) => {
  const renderRequest = (request: Request, index: number) => {
    return (
      <Card sx={{ marginBottom: "3vh" }} key={index}>
        <CardContent>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
          >
            <Grid item>
              <Typography variant="h5">{request.tripName}</Typography>
              <Typography variant="body2" color="textSecondary">
                Reserver Name: {request.customerName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reserved date: {request.startDate + " to " + request.endDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Price: {request.price}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs="auto"
              direction={{ xs: "row", sm: "column" }}
              justifyContent={{ xs: "flex-start", sm: "center" }}
              alignItems={{ xs: "center", sm: "flex-end" }}
            >
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleConfirm(request)}
                  size="small"
                  sx={{ marginRight: "2vw", marginTop: "1vh" }}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleCancel(request)}
                  size="small"
                  sx={{ marginRight: "2vw", marginTop: "1vh" }}
                >
                  Deny
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <List>
        {requests.map((request, index) => {
          if (
            confirmedRequests.some((confirmed) => confirmed.id === request.id)
          ) {
            return null;
          }
          if (
            cancelledRequests.some((cancelled) => cancelled.id === request.id)
          ) {
            return null;
          }
          return renderRequest(request, index);
        })}
      </List>
    </div>
  );
};

export default NewRequest;
||||||| parent of f2437d0 (fix: move landing page to home page)
=======
import React, { useState } from "react";
import {
  List,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  
} from "@mui/material";
import Request,{INewRequestProps} from "./Types";
  
const NewRequest = ({requests,confirmedRequests,cancelledRequests,handleConfirm,handleCancel}:INewRequestProps) => {

  const renderRequest = (request: Request) => {
    return (
    <Card sx={{marginBottom:"3vh"}}>
      <CardContent>
        <Grid container direction={{xs:"column",sm:"row"}} justifyContent={{xs:"flex-start",sm:"space-between"}}>
            <Grid item>
                <Typography variant="h5">
                    {request.tripName}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    Reserver Name: {request.customerName}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    Reserved date: {request.startDate+' to ' + request.endDate }
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    Price: {request.price}
                </Typography>
            </Grid>
              <Grid item container xs="auto" direction={{xs:"row",sm:"column"}} justifyContent={{xs:"flex-start",sm:"center"}} alignItems={{xs:"center",sm:"flex-end"}}>
                <Grid item xs="auto">
                    <Button variant="contained" color="secondary" onClick={() => handleConfirm(request)} size="small" sx={{marginRight:"2vw", marginTop:"1vh"}}>
                        Accept
                    </Button>
                </Grid>
                <Grid item xs="auto">
                    <Button variant="contained" color="warning" onClick={() => handleCancel(request)} size="small" sx={{marginRight:"2vw", marginTop:"1vh"}} >
                        Deny
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </CardContent>
  </Card>
    );
  };

  return (
    <div>
      <List>
        {requests.map((request) => {
          if (
            confirmedRequests.some((confirmed) => confirmed.id === request.id)
          ) {
            return null;
          }
          if (
            cancelledRequests.some((cancelled) => cancelled.id === request.id)
          ) {
            return null;
          }
          return renderRequest(request);
        })}
      </List>
    </div>
  );
};

export default NewRequest;
>>>>>>> f2437d0 (fix: move landing page to home page)
