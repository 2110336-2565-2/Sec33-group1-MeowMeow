import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IShowProfileProps {
  imageUrl: string;
  fullName: string;
  userName: string;
  email: string;
  onStartEdit: () => void;
}

const ShowProfile = ({
  imageUrl,
  fullName,
  userName,
  email,
  onStartEdit,
}: IShowProfileProps) => {
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
          <Typography fontWeight="600" fontSize={{ xs: 24, sm: 32 }}>
            {fullName}
          </Typography>
          <Typography>Username: {userName}</Typography>
          <Typography>Email: {email}</Typography>
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
