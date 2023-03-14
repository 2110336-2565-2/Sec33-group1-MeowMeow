import {
  Stack,
  Button,
  TextField,
  TextFieldProps,
  Grid,
  styled,
  Paper,
  Alert,
  Snackbar,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import usePostForm from "@/hooks/usePostForm";
import useSnackbar from "@/hooks/useSnackbar";

export default function PostForm() {
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(undefined));
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(undefined)
  );
  const [location, setLocation] = React.useState<string | null>(null);

  const handleEndChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };
  const handleStartChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const { onAddSnackbar, onClose, onExit, isOpen, messageInfo } = useSnackbar();
  const { onSubmit, isLoading } = usePostForm({
    onError: onAddSnackbar,
    onSuccess: onAddSnackbar,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack
      component="form"
      direction="column"
      spacing="16px"
      width="100%"
      overflow="auto"
      sx={{ padding: "10px" }}
      onSubmit={onSubmit}
    >
      <TextField id="tripName" label="Trip Name" variant="outlined" />
      <TextField id="location" label="Location" variant="outlined" />
      <Stack direction="row" spacing="20px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleStartChange}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField id="startDate" {...params} sx={{ width: "100%" }} />
            )}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEndChange}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField id="endDate" {...params} sx={{ width: "100%" }} />
            )}
          />
        </LocalizationProvider>
      </Stack>
      <TextField id="description" label="Description" variant="outlined" />
      <Stack direction="row" spacing="20px">
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="float"
          sx={{ width: "100%" }}
        />
        <TextField
          id="maxParticipant"
          label="Max Participant"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
        />
      </Stack>
      <TextField
        id="lineid"
        label="Line ID"
        variant="outlined"
        sx={{ width: "100%" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ color: "white" }}
      >
        Create
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={messageInfo ? messageInfo.key : undefined}
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}
        sx={{
          width: "75%",
          minWidth: "300px",
        }}
        TransitionProps={{ onExited: onExit }}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert
          severity={messageInfo?.severity ?? "error"}
          variant="filled"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="500" textTransform="capitalize">
            {messageInfo?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
