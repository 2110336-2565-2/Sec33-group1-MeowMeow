import {
  Stack,
  Button,
  TextField,
  Alert,
  Snackbar,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useEffect } from "react";
import { usePostForm } from "@/hooks/usePostForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import ChipsArray from "./chipArray";
import editViewModel, { IGetPost } from "./editViewModel";
import { METHOD_TYPE } from "@/constants/PostPage";

export interface ChipPostData {
  key: number;
  label: string;
}

export default function PostForm() {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormBody({ ...formBody, [name]: value });
  };

  const onArray = (name: string, value: string[]) => {
    setFormBody({ ...formBody, [name]: value });
  };

  const data: IGetPost = editViewModel();
  const prev = React.useRef(data);
  const [formBody, setFormBody] = React.useState<IGetPost>(data);

  useEffect(() => {
    setFormBody({ ...data });
  }, [prev.current !== data]);

  const { onSubmit, isLoading } = usePostForm({
    methodType: METHOD_TYPE.PUT,
    formData: formBody,
  });

  if (isLoading || formBody.title === undefined) {
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
        defaultValue={formBody.title}
        onChange={onChange}
      />
      <TextField
        name="content"
        id="content"
        label="content"
        variant="outlined"
        defaultValue={formBody.content}
        onChange={onChange}
      />
      <ChipsArray
        id="locations"
        label="Your Location"
        data={formBody.locations || []}
        onArray={onArray}
        value={formBody.locations}
      />
      <ChipsArray
        id="tags"
        label="Your TourStyle"
        data={formBody.tags || []}
        onArray={onArray}
        value={formBody.tags}
      />
      <Stack direction="row" spacing="20px">
        <TextField
          name="fee"
          id="fee"
          label="fee"
          variant="outlined"
          type="text"
          sx={{ width: "100%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">฿</InputAdornment>,
            inputMode: "decimal",
          }}
          defaultValue={formBody.fee}
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
          defaultValue={formBody.maxParticipant}
          onChange={onChange}
        />
      </Stack>
      <TextField
        name="contactInfo"
        id="contactInfo"
        label="Contact Information"
        variant="outlined"
        sx={{ width: "100%" }}
        defaultValue={formBody.contactInfo}
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
