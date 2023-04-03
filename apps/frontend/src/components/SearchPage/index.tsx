import { FeedStatus } from "@/hooks/types/FeedStatus";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { Box, Container, Pagination, Skeleton, Stack } from "@mui/material";
import Navbar from "../common/Navbar";
import PostFeed from "./PostFeed";
import SearchBox from "./SearchBox";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import AppSnackbar from "../common/AppSnackbar";

const SearchPage = () => {
  const {
    tempSearch,
    allPage,
    pageNo,
    feed,
    feedStatus,
    filterStuff, // extract filter logic inside useSearchPosts
    setTempSearch,
    setPageNo,
    handleSearch,
  } = useSearchPosts();

  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: "2rem",
        }}
      >
        <SearchBox
          tempSearch={tempSearch}
          setTempSearch={setTempSearch}
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
                count={allPage}
                onChange={(e, page) => setPageNo(page)}
                shape="rounded"
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Container>
      <AppSnackbar
        messageInfo={messageInfo}
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
      />
    </>
  );
};
export default SearchPage;
