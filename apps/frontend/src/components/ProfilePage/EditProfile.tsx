import { PROFILE_INPUT_IDs } from "@/constants/ProfilePage";
import { NotificationContext } from "@/context/NotificationContext";
import apiClient from "@/utils/apiClient";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import StyleTextField from "../LoginPage/StyledTextField";
import { IProfileData } from "./types/profilePage";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import AppSnackbar from "../common/AppSnackbar";
import { AlertColor } from "@mui/material/Alert";

interface IEditProfileProps {
  profileData: IProfileData;
  onEndEdit: () => void;
}

const uploadMedia = async (
  image: File,
  addNotification: (message: string, severity: AlertColor) => void
) => {
  const formData = new FormData();
  formData.append("file", image);
  try {
    const response = await apiClient.post<{ message: string; id: string }>(
      "/media",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.id;
  } catch (err) {
    const error = err as Error;
    addNotification(error.message, "error");
  }
};

const updateProfile = async (
  formBody: { [key: string]: string },
  addNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    const response = await apiClient.put("/users/users", formBody);
    return response;
  } catch (err) {
    const error = err as Error;
    addNotification(error.message, "error");
  }
};

const EditProfile = ({ profileData, onEndEdit }: IEditProfileProps) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const { addNotification } = useContext(NotificationContext);
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();

  const onUploadImage: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      return;
    }
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formBody = PROFILE_INPUT_IDs.reduce((prev, formId) => {
      prev[formId] = event.currentTarget[formId].value;
      return prev;
    }, {} as { [key: string]: string });
    if (image) {
      const imageId = await uploadMedia(image, addNotification);
      formBody.id = imageId || "";
    }
    const response = await updateProfile(formBody, addNotification);
    if (response) {
      onEndEdit();
    }
  };

  return (
    <Stack
      component="form"
      spacing="24px"
      width="100%"
      maxWidth={{ md: "600px", lg: "800px" }}
      onSubmit={onSubmit}
    >
      <StyleTextField
        label="Firstname"
        defaultValue={profileData.firstName}
        placeholder="Firstname"
        id="firstName"
      />
      <StyleTextField
        label="Lastname"
        placeholder="Lastname"
        defaultValue={profileData.lastName}
        id="lastName"
      />
      <StyleTextField
        label="Username"
        placeholder="Username"
        defaultValue={profileData.username}
        id="username"
      />
      <StyleTextField
        label="Email"
        placeholder="Email"
        defaultValue={profileData.email}
        id="email"
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography variant="body2" fontWeight="500">
          Upload Profile Image:
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

      <Button type="submit" variant="contained" fullWidth>
        <Typography
          variant="body2"
          fontWeight="500"
          color="white"
          paddingY="4px"
          textTransform="none"
        >
          Save Profile
        </Typography>
      </Button>
      <AppSnackbar
        messageInfo={messageInfo}
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
      />
    </Stack>
  );
};

export default EditProfile;
