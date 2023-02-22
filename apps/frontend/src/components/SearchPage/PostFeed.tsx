import { FeedStatus } from "@/hooks/types/FeedStatus";
import { SearchOff } from "@mui/icons-material";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import PostCard, { mockPost } from "./PostCard";
import { IPost } from "./types";

interface IPostFeedProps {
  feed: IPost[];
}

export default function PostFeed({ feed }: IPostFeedProps) {
  return (
    <Box margin={2} display="flex" flexDirection="column" gap={2}>
      {feed.length !== 0 ? (
        feed.map((item, idx) => {
          return <PostCard key={idx} {...item} />;
        })
      ) : (
        <Stack
          gap={2}
          alignItems="center"
          justifyContent="center"
          minHeight={300}
        >
          <SearchOff fontSize="large" />
          <Typography variant="body1">No Post Found</Typography>
        </Stack>
      )}
    </Box>
  );
}
