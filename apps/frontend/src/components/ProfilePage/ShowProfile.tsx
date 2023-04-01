import { IUser } from "@/context/type/authContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import apiClient from "@/utils/apiClient";
import {
  IGuideProfile,
  IGuideProfileResponse,
  IMediaResponse,
} from "./types/profilePage";
import Locations from "./Locations";
import TourStyles from "./TourStyles";
import { Widgets } from "@mui/icons-material";

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

const getCertificationPicture = async (id: string) => {
  const response = await apiClient.get(`/media/${id}`, {
    headers: {
      "Content-Disposition": "attachment",
    },
  });
  //console.log("blob = ", URL.createObjectURL(response.data as unknown as Blob));
  return response;
};

const ShowProfile = ({ imageUrl, onStartEdit }: IShowProfileProps) => {
  const { user } = useContext(AuthContext);
  const { firstName, lastName, username, email, roles } = user || ({} as IUser);
  const [guideProfile, setGuideProfile] = useState<IGuideProfile | undefined>(
    undefined
  );
  const [certificateImage, setCertificateImage] = useState();

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
      /*const response = await getCertificationPicture(certificateId);
      console.log(window.open(response.data as unknown as string));
      const file = URL.createObjectURL(response.data as unknown as Blob);
      console.log(file); */
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
          src={imageUrl}
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
      <Stack spacing="16px" direction="column" alignItems="center" width="100%">
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              if (!guideProfile?.certificateId) {
                return;
              }
              window.open(
                `${process.env.backendBaseURL}/media/${guideProfile?.certificateId}`
              );
            }}
          >
            Download certificate
          </Button>
        </Stack>
      </Stack>
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
