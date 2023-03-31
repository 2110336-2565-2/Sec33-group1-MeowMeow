import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useState } from "react";
import Navbar from "../common/Navbar";
import { IProfileData } from "./types/profilePage";
import Box from "@mui/material/Box";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";

const imageUrl =
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

interface IProfilePageProps {
  profileData: IProfileData;
}

const ProfilePage = ({ profileData }: IProfilePageProps) => {
  const { firstName, lastName, userName, email } = profileData;
  const fullName = `${firstName} ${lastName}`;
  const [isEdit, setEdit] = useState<boolean>(false);
  const onStartEdit = useCallback(() => {
    setEdit(true);
  }, []);
  const onEndEdit = useCallback(() => {
    setEdit(false);
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <Typography marginBottom="32px" variant="h4" fontWeight="700">
          Profile
        </Typography>
        {!isEdit ? (
          <ShowProfile
            imageUrl={imageUrl}
            fullName={fullName}
            userName={userName}
            email={email}
            onStartEdit={onStartEdit}
          />
        ) : (
          <EditProfile profileData={profileData} />
        )}
      </Box>
    </Fragment>
  );
};

export default ProfilePage;
