import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { IGetProfileResponse, IProfileData } from "./types/profilePage";
import Box from "@mui/material/Box";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import apiClient from "@/utils/apiClient";

const imageUrl =
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

interface IProfilePageProps {
  profileData: IProfileData;
}

const mockFetchUserProfile = async () => {
  //const response = await apiClient.get<IGetProfileResponse>("/users/profiles");
  return {
    message: "success",
    id: 18,
    email: "test21@hotmail.com",
    username: "polapob2545",
    firstName: "polapob",
    lastName: "ratanachayoto",
  };
};

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<IProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const fullName = `${profileData.firstName} ${profileData.lastName}`;
  const [isEdit, setEdit] = useState<boolean>(false);

  const onStartEdit = useCallback(() => {
    setEdit(true);
  }, []);

  const onEndEdit = useCallback(() => {
    setEdit(false);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await mockFetchUserProfile();
      const { firstName, lastName, username, email } = response;
      setProfileData({ firstName, lastName, username, email });
    };
    fetchUserProfile();
  }, []);

  return (
    <Fragment>
      <Navbar />
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
            userName={profileData.username}
            email={profileData.email}
            onStartEdit={onStartEdit}
          />
        ) : (
          <EditProfile profileData={profileData} onEndEdit={onEndEdit} />
        )}
      </Box>
    </Fragment>
  );
};

export default ProfilePage;
