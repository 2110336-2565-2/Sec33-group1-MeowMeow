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
  useMemo,
  useState,
} from "react";
import StyleTextField from "../LoginPage/StyledTextField";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import AppSnackbar from "../common/AppSnackbar";
import { IUser } from "@/context/type/authContext";
import { AuthContext } from "@/context/AuthContext";
import GuideEditProfile from "./GuideEditProfile";

interface IEditProfileProps {
  onEndEdit: () => void;
}

const uploadImage = async (formData: FormData) => {
  const response = await apiClient.post<{ message: string; id: string }>(
    "media",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.id;
};

const EditProfile = ({ onEndEdit }: IEditProfileProps) => {
  const { user, refreshProfile } = useContext(AuthContext);
  const isGuide = useMemo(() => {
    return !!user?.roles?.includes("GUIDE");
  }, [user]);
  const { firstName, lastName, username, email, roles } = user || ({} as IUser);
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
      const formData = new FormData();
      formData.append("file", image);
      const imageId = await uploadImage(formData);
      formBody.imageId = imageId;
    }
    try {
      await apiClient.put("/users", formBody);
      refreshProfile();
      onEndEdit();
    } catch (err) {
      const error = err as Error;
      addNotification(error.message, "error");
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
        defaultValue={firstName}
        placeholder="Firstname"
        id="firstName"
      />
      <StyleTextField
        label="Lastname"
        placeholder="Lastname"
        defaultValue={lastName}
        id="lastName"
      />
      <StyleTextField
        label="Username"
        placeholder="Username"
        defaultValue={username}
        id="username"
      />
      <StyleTextField
        label="Email"
        placeholder="Email"
        defaultValue={email}
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

      {isGuide && <GuideEditProfile />}

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
