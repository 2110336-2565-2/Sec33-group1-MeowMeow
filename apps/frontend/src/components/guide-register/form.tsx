import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import useRegisterGuideForm, {
  setLocationAndTourStyle,
} from "@/hooks/useRegisterGuideForm";
import {
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import ChipsArray from "./chipArray";

export interface ChipData {
  key: number;
  label: string;
}

export default function GuideRegisterForm() {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const [image, setImage] = useState<File | undefined>(undefined);

  const onUploadImage: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      return;
    }
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };
  const [location, setLocation] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Bangkok" },
    { key: 1, label: "Thailand" },
  ]);
  const [tourStyle, setTourStyle] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Playful" },
    { key: 1, label: "Knowledge" },
  ]);

  useEffect(() => {
    setLocationAndTourStyle(location, tourStyle);
  }, [location, tourStyle]);

  const { onSubmit, isLoading } = useRegisterGuideForm();

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
      <ChipsArray
        id="location"
        label="Your Location"
        chipData={location}
        setChipData={setLocation}
      />
      <ChipsArray
        id="tourStyle"
        label="Your TourStyle"
        chipData={tourStyle}
        setChipData={setTourStyle}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography variant="body2" fontWeight="500">
          Upload Guide's Certificate
        </Typography>
        <Stack direction="row" alignItems="center" spacing="1rem">
          <Button variant="contained" color="secondary" component="label">
            <Typography
              variant="body2"
              fontWeight="500"
              color="white"
              textTransform="none"
            >
              Upload Image
            </Typography>
            <input
              id="certificate"
              hidden
              accept="/images/*"
              type="file"
              onChange={onUploadImage}
            />
          </Button>
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#F46D21",
                transition: "color 250ms",
              },
            }}
            onClick={() => {
              if (!image) {
                return;
              }
              const objectURL = URL.createObjectURL(image);
              window.open(objectURL);
            }}
          >
            {image && image?.name.toString()}
          </Typography>
        </Stack>
      </Stack>

      <Button type="submit" variant="contained">
        <Typography
          variant="body2"
          fontWeight="500"
          color="white"
          paddingY="4px"
          textTransform="none"
        >
          Submit
        </Typography>
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
