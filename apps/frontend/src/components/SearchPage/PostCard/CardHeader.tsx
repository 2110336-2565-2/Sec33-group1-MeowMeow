import { Avatar, Box, Link } from "@mui/material";
import OptionMenu from "./OptionMenu";
import NextLink from "next/link";
interface ICardHeader {
  postId: number;
  profile: string;
  name: string;
  authorId: number;
  currentUserId: number;
}

const CardHeader = (props: ICardHeader) => {
  const { profile, name, authorId, postId, currentUserId } = props;

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
        <NextLink
          href={`/guide-profile/${authorId}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          {name}
        </NextLink>
      </Box>
      <OptionMenu isOwner={currentUserId === authorId} postId={postId} />
    </>
  );
};
export default CardHeader;
