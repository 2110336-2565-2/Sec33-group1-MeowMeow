import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import Router from "next/router";

const PendingDisplay = () => {
  return (
    <Stack gap={8} p={8}>
      <LinearProgress />
      <Typography variant="h4" textAlign={"center"}>
        Payment Pending
      </Typography>
    </Stack>
  );
};

const FailedDisplay = () => {
  return (
    <Stack gap={4} p={8} alignItems={"center"}>
      <ErrorOutline
        sx={{
          fontSize: 80,
          color: "error.main",
        }}
      />
      <Typography variant="h4" textAlign={"center"}>
        Payment Failed
      </Typography>
      <Button variant="outlined" onClick={() => Router.reload()}>
        Try Again
      </Button>
    </Stack>
  );
};

const SuccessDisplay = () => {
  return (
    <Stack gap={4} p={8} alignItems={"center"}>
      <CheckCircleOutline
        sx={{
          fontSize: 80,
          color: "success.main",
        }}
      />
      <Typography variant="h4" textAlign={"center"}>
        Payment Successful
      </Typography>
    </Stack>
  );
};

export { PendingDisplay, FailedDisplay, SuccessDisplay };
