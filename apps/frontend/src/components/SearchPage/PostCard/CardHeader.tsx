import { Avatar, Box, Typography } from "@mui/material";
import OptionMenu from "./OptionMenu";

interface ICardHeader {
  post_id: number;
  profile: string;
  name: string;
  isOwner: boolean;
}

const CardHeader = (props: ICardHeader) => {
  const { profile, name, isOwner, post_id } = props;

  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          src={profile}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        <Typography variant="h6">{name}</Typography>
      </Box>
      <OptionMenu isOwner={isOwner} post_id={post_id} />
    </>
  );
};
export default CardHeader;
