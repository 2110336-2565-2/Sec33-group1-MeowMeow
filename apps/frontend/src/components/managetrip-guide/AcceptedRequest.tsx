import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Typography,
} from "@mui/material";
import Request, { IAcceptedRequestProps } from "./Types";

const AcceptedRequest = ({
  confirmedRequests,
  cancelledRequests,
  handleCancel,
}: IAcceptedRequestProps) => {
  const [open, setOpen] = useState(false);
  const [curReq, setCurReq] = useState<Request>({
    id: 0,
    customerName: "",
    tripName: "",
    startDate: "",
    endDate: "",
    price: 0,
    numCustomer: 0,
    status: 0,
  });
  const handleClick = (request: Request) => {
    setCurReq(request);
    setOpen(true);
  };
  const handleYes = () => {
    handleCancel(curReq);
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };
  const renderRequest = (request: Request) => {
    return (
      <Card sx={{ marginBottom: "3vh" }}>
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
              <Typography variant="body2" color="textSecondary">
                Status: {request.status == 0 ? "waiting for payment" : "paid"}
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
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleClick(request)}
                size="small"
                sx={{ marginRight: "2vw", marginTop: "1vh" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  return (
    <div>
      <List>
        {confirmedRequests.map((request) => {
          if (
            cancelledRequests.some((cancelled) => cancelled.id === request.id)
          ) {
            return null;
          }
          return renderRequest(request);
        })}
      </List>
      <Dialog open={open} onClose={handleNo}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            Upon cancellation, the client's money we be fully refunded.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            However, you may lost some of your credibility.
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary">
            {" "}
            This process cannot be undone, are you sure you want to cancel this
            appointment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary" size="small">
            Yes
          </Button>
          <Button onClick={handleNo} color="primary" size="small">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptedRequest;
