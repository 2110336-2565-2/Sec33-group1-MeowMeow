import { SearchOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import PostCard, { mockPost } from "./PostCard";
import { IPost } from "./types";

const mockList: IPost[] = [mockPost, mockPost, mockPost];

export default function PostFeed() {
  return (
    <Box margin={2} display="flex" flexDirection="column" gap={2}>
      {mockList.length !== 0 ? (
        mockList.map((item, idx) => {
          return <PostCard key={idx} {...item} />;
        })
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          justifyContent="center"
          minHeight={300}
        >
          <SearchOff fontSize="large" />
          <Typography variant="body1">No Post Found</Typography>
        </Box>
      )}
    </Box>
  );
}
