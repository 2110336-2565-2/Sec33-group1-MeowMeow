import { PROFILE_INPUT_IDs } from "@/constants/ProfilePage";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormEventHandler } from "react";
import StyleTextField from "../LoginPage/StyledTextField";
import { IProfileData } from "./types/profilePage";

interface IEditProfileProps {
  profileData: IProfileData;
}

const EditProfile = ({ profileData }: IEditProfileProps) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formBody = PROFILE_INPUT_IDs.reduce((prev, formId) => {
      prev[formId] = event.currentTarget[formId].value;
      return prev;
    }, {} as { [key: string]: string });
    console.log(formBody);
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
        defaultValue={profileData.userName}
        id="userName"
      />
      <StyleTextField
        label="Email"
        placeholder="Email"
        defaultValue={profileData.email}
        id="email"
      />
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
    </Stack>
  );
};

export default EditProfile;
