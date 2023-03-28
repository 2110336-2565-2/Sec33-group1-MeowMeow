import {
  Stack,
  Button,
  TextField,
  Alert,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import usePostForm from "@/hooks/usePostForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import useEditPostForm from "@/hooks/useEditForm";

export interface IPostForm {
  methodType: "POST" | "PUT";
}

export default function PostForm({ methodType }: IPostForm) {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const { onSubmit, isLoading } = usePostForm({
    methodType: methodType,
  });

  const { formBody, onChange } = useEditPostForm({ methodType: methodType });

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
      <TextField
        name="tripName"
        id="tripName"
        label="Trip Name"
        variant="outlined"
        value={formBody.tripName}
        onChange={onChange}
      />
      <TextField
        name="location"
        id="location"
        label="Location"
        variant="outlined"
        value={formBody.location}
        onChange={onChange}
      />
      <Stack direction="row" spacing="20px">
        <TextField
          id="startDate"
          name="startDate"
          label="Start Date"
          type="datetime-local"
          value={formBody.startDate}
          sx={{ width: "100%" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
        <TextField
          id="endDate"
          name="endDate"
          label="End Date"
          type="datetime-local"
          value={formBody.endDate}
          sx={{ width: "100%" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
      </Stack>
      <TextField
        name="description"
        id="description"
        label="Description"
        variant="outlined"
        value={formBody.description}
        onChange={onChange}
      />
      <Stack direction="row" spacing="20px">
        <TextField
          name="price"
          id="price"
          label="Price"
          variant="outlined"
          type="float"
          sx={{ width: "100%" }}
          value={formBody.price}
          onChange={onChange}
        />
        <TextField
          name="maxParticipant"
          id="maxParticipant"
          label="Max Participant"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
          value={formBody.maxParticipant}
          onChange={onChange}
        />
      </Stack>
      <TextField
        name="lineid"
        id="lineid"
        label="Line ID"
        variant="outlined"
        sx={{ width: "100%" }}
        value={formBody.lineid}
        onChange={onChange}
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
