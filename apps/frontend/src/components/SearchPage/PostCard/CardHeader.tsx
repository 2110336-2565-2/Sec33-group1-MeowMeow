import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

interface ICardHeader {
  profile: string;
  name: string;
}

export default function CardHeader(props: ICardHeader) {
  const { profile, name } = props;
  return (
    <>
      <Box display="flex" gap={2}>
        <Avatar
          src={profile}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        <Typography variant="h6">{name}</Typography>
      </Box>
      <IconButton>
        <MoreHoriz />
      </IconButton>
    </>
  );
}
