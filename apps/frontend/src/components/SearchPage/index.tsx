import { FeedStatus } from "@/hooks/types/FeedStatus";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { Box, Container, Pagination, Skeleton, Stack } from "@mui/material";
import Navbar from "../common/Navbar";
import PostFeed from "./PostFeed";
import SearchBox from "./SearchBox";

export default function SearchPage() {
  const {
    search,
    setSearch,
    setPageNo,
    pageNo,
    feed,
    feedStatus,
    handleSearch,
    filterStuff, // extract filter logic inside useSearchPosts
  } = useSearchPosts();

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: "2rem",
        }}
      >
        <SearchBox
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          filterStuff={filterStuff} // props drilling
        />
        {feedStatus === FeedStatus.LOADING ? (
          <Stack m={2} gap={2}>
            <Skeleton variant="rounded" height={300} />
            <Skeleton variant="rounded" height={300} />
            <Skeleton variant="rounded" height={300} />
          </Stack>
        ) : (
          <></>
        )}
        {feedStatus === FeedStatus.SHOWING ? (
          <>
            <PostFeed feed={feed} />
            <Box my={4} display="flex" justifyContent="center">
              <Pagination
                page={pageNo}
                count={10}
                onChange={(e, page) => setPageNo(page)}
                shape="rounded"
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
