import { Avatar, Box } from "@mui/material";
import OptionMenu from "./OptionMenu";
import NextLink from "next/link";
interface ICardHeader {
  postId: number;
  profile: string;
  name: string;
  userId: number;
  guideId: number;
  currentUserId: number;
}

const CardHeader = (props: ICardHeader) => {
  const { profile, name, userId, postId, currentUserId, guideId } = props;

  const imageUrl = process.env.backendBaseURL + "media/" + profile;

  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          src={profile ? imageUrl : ""}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        <NextLink
          href={`/guide-profile/${guideId}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          {name}
        </NextLink>
      </Box>
      <OptionMenu isOwner={currentUserId === userId} postId={postId} />
    </>
  );
};
export default CardHeader;
