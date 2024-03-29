import {
  Stack,
  Button,
  TextField,
  Alert,
  Snackbar,
  Typography,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { usePostForm } from "@/hooks/usePostForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import ChipsArray from "./chipArray";
import { IGetPost } from "./editViewModel";
import { METHOD_TYPE } from "@/constants/PostPage";

export interface ChipPostData {
  key: number;
  label: string;
}

export default function FormPost() {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const [formBody, setFormBody] = React.useState<IGetPost>({
    title: "",
    locations: ["Thailand"],
    tags: ["Playful"],
    content: "",
    fee: 0,
    maxParticipant: 0,
    contactInfo: "",
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormBody({ ...formBody, [name]: value });
  };

  const onArray = (name: string, value: string[]) => {
    setFormBody({ ...formBody, [name]: value });
  };

  const { onSubmit, isLoading } = usePostForm({
    methodType: METHOD_TYPE.POST,
    formData: formBody,
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
      <TextField
        name="title"
        id="title"
        label="Trip Name"
        variant="outlined"
        value={formBody.title}
        onChange={onChange}
      />
      <TextField
        name="content"
        id="content"
        label="content"
        variant="outlined"
        value={formBody.content}
        onChange={onChange}
      />
      <ChipsArray
        id="locations"
        label="Your Location"
        data={formBody.locations}
        onArray={onArray}
        value={formBody.locations}
      />
      <ChipsArray
        id="tags"
        label="Your TourStyle"
        data={formBody.tags}
        onArray={onArray}
        value={formBody.tags}
      />
      <Stack direction="row" spacing="20px">
        <TextField
          name="fee"
          id="fee"
          label="fee"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
          inputProps={{ inputMode: "decimal" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">฿</InputAdornment>,
          }}
          value={formBody.fee}
          onChange={onChange}
        />
        <TextField
          name="maxParticipant"
          id="maxParticipant"
          label="Max Participant"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
          value={formBody.maxParticipant}
          onChange={onChange}
        />
      </Stack>
      <TextField
        name="contactInfo"
        id="contactInfo"
        label="Contact Information"
        variant="outlined"
        sx={{ width: "100%" }}
        value={formBody.contactInfo}
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
