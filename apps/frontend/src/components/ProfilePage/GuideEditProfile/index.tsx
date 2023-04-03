import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { getGuideProfile } from "../ShowProfile";
import { AuthContext } from "@/context/AuthContext";
import Chip from "@mui/material/Chip";
import TextFieldWithButton from "../TextFieldWithButton";
import Button from "@mui/material/Button";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";

const updateGuideData = async (locations: string[], tourStyles: string[]) => {
  await apiClient.post("/guides/update", {
    locations,
    tourStyles,
  });
};

const GuideEditProfile = () => {
  const { user } = useContext(AuthContext);
  const [editLocations, setEditLocations] = useState<string[]>([]);
  const [editTourStyles, setEditTourStyles] = useState<string[]>([]);
  const router = useRouter();
  const onAddLocation = useCallback(
    (text: string) => {
      const isFind = editLocations.find((location) => location === text);
      if (!!isFind) {
        return;
      }
      setEditLocations([...editLocations, text]);
    },
    [editLocations]
  );

  const onAddTourStyles = useCallback(
    (text: string) => {
      const isFind = editTourStyles.find((tourStyle) => tourStyle === text);
      if (!!isFind) {
        return;
      }
      setEditTourStyles([...editTourStyles, text]);
    },
    [editTourStyles]
  );

  useEffect(() => {
    const fetchGuideProfile = async () => {
      if (!user?.roles?.includes("GUIDE")) {
        return;
      }
      const { data } = await getGuideProfile();
      const { locations, tourStyles } = data;
      setEditLocations(locations);
      setEditTourStyles(tourStyles);
    };
    fetchGuideProfile();
  }, [user]);

  return (
    <Stack
      direction="column"
      alignItems={"start"}
      justifyContent={"content"}
      spacing="24px"
      width="100%"
    >
      <Typography textAlign="center">Guide Edit Profile</Typography>
      <Stack
        direction="row"
        justifyItems="start"
        alignItems="center"
        spacing="16px"
      >
        <Typography>Locations:</Typography>
        <Stack direction="row" spacing={1}>
          {editLocations.map((location) => {
            return (
              <Chip
                label={location}
                key={location}
                variant="outlined"
                color="primary"
                onDelete={() => {
                  setEditLocations((prevState) => {
                    return prevState.filter(
                      (_location) => _location !== location
                    );
                  });
                }}
              />
            );
          })}
        </Stack>
      </Stack>
      <TextFieldWithButton
        placeholder="Add Location..."
        label="Location"
        onClick={onAddLocation}
      />
      <Stack
        direction="row"
        justifyItems="start"
        alignItems="center"
        spacing="16px"
      >
        <Typography>Tour Styles:</Typography>
        <Stack direction="row" spacing={1}>
          {editTourStyles.map((tourStyle) => {
            return (
              <Chip
                label={tourStyle}
                key={tourStyle}
                variant="outlined"
                color="primary"
                onDelete={() => {
                  setEditTourStyles((prevState) => {
                    return prevState.filter(
                      (_tourStyle) => _tourStyle !== tourStyle
                    );
                  });
                }}
              />
            );
          })}
        </Stack>
      </Stack>
      <TextFieldWithButton
        placeholder="Add Tour styles..."
        label="Tour Styles"
        onClick={onAddTourStyles}
      />
      <Button
        onClick={async () => {
          try {
            await updateGuideData(editLocations, editTourStyles);
            router.reload();
          } catch (err) {}
        }}
        variant="contained"
        fullWidth
      >
        <Typography
          variant="body2"
          fontWeight="500"
          color="white"
          paddingY="4px"
          textTransform="none"
        >
          Save Guide Profile
        </Typography>
      </Button>
    </Stack>
  );
};

export default GuideEditProfile;
