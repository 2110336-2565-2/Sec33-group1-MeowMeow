import { IUser } from "@/context/type/authContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import apiClient from "@/utils/apiClient";
import { IGuideProfile, IGuideProfileResponse } from "./types/profilePage";
import Locations from "./Locations";
import TourStyles from "./TourStyles";

interface IShowProfileProps {
  imageUrl: string;
  onStartEdit: () => void;
}

export const getGuideProfile = async () => {
  const response = await apiClient.get<IGuideProfileResponse>(
    "/guides/profile"
  );
  return response;
};

const ShowProfile = ({ imageUrl, onStartEdit }: IShowProfileProps) => {
  const { user } = useContext(AuthContext);
  const { firstName, lastName, username, email, roles } = user || ({} as IUser);
  const [guideProfile, setGuideProfile] = useState<IGuideProfile | undefined>(
    undefined
  );
  const [certificateImage, setCertificateImage] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchGuideProfile = async () => {
      if (!user?.roles?.includes("GUIDE")) {
        return;
      }

      const { data } = await getGuideProfile();
      const { certificateId, locations, tourStyles, averageReviewScore } = data;

      setGuideProfile({
        certificateId,
        locations,
        tourStyles,
        averageReviewScore,
      });
      if (!certificateId) {
        return;
      }

      setCertificateImage(
        `${process.env.backendBaseURL}/media/${certificateId}`
      );
    };
    fetchGuideProfile();
  }, [user]);

  console.log(guideProfile);

  const fullName = `${firstName} ${lastName}`;
  return (
    <Stack
      direction="column"
      justifyContent="start"
      alignItems="center"
      spacing="48px"
      width="100%"
      maxWidth={{ md: "600px", lg: "800px" }}
    >
      <Stack
        width="100%"
        direction="row"
        spacing={{ lg: "48px", md: "32px", xs: "16px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          src={`${process.env.backendBaseURL}/media/${user?.imageId}`}
          sx={{
            width: { xs: 160, sm: 200, md: 160, lg: 200 },
            height: { xs: 160, sm: 200, md: 160, lg: 200 },
          }}
        />
        <Stack direction="column" justifyContent="center" alignItems="start">
          <Typography fontWeight="600">{fullName}</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
        </Stack>
      </Stack>

      {guideProfile && (
        <Stack
          spacing="16px"
          direction="column"
          alignItems="center"
          width="100%"
        >
          <Typography fontWeight="bold" textAlign="center">
            Guide Profile Information
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="start"
            spacing="16px"
            minWidth="450px"
          >
            <Locations locations={guideProfile?.locations || []} />
            <TourStyles tourStyles={guideProfile?.tourStyles || []} />
            <Typography>
              Average review score: {guideProfile?.averageReviewScore}
            </Typography>
            <Stack direction="column" spacing={"16px"}>
              <Typography>Show Certificate</Typography>
              <Avatar
                src={certificateImage}
                sx={{ width: "250px", height: "250px", borderRadius: "0px" }}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
      <Button variant="contained" fullWidth onClick={onStartEdit}>
        <Typography
          variant="body2"
          fontWeight="500"
          color="white"
          paddingY="4px"
          textTransform="none"
        >
          Edit Profile
        </Typography>
      </Button>
    </Stack>
  );
};

export default ShowProfile;
