import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useContext, useState } from "react";
import Navbar from "../common/Navbar";
import { IProfileData } from "./types/profilePage";
import Box from "@mui/material/Box";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import { AuthContext } from "@/context/AuthContext";
import { IUser } from "@/context/type/authContext";

const imageUrl =
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const ProfilePage = () => {
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
          margin: "24px 0px",
        }}
      >
        <Typography marginBottom="32px" variant="h4" fontWeight="700">
          Profile
        </Typography>
        {isEdit ? (
          <EditProfile onEndEdit={onEndEdit} />
        ) : (
          <ShowProfile imageUrl={imageUrl} onStartEdit={onStartEdit} />
        )}
      </Box>
    </Fragment>
  );
};

export default ProfilePage;
