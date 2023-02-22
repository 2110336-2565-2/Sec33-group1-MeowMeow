import { useSearchPosts } from "@/hooks/useSearchPosts";
import { Box, Container, Pagination } from "@mui/material";
import Navbar from "../common/Navbar";
import PostFeed from "./PostFeed";
import SearchBox from "./SearchBox";

export default function SearchPage() {
  const { search, setSearch, setPageNo, pageNo, feed, handleSearch } =
    useSearchPosts();

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
        />
        <PostFeed feed={feed} />
        <Box my={4} display="flex" justifyContent="center">
          <Pagination
            page={pageNo}
            count={10}
            onChange={(e, page) => setPageNo(page)}
            shape="rounded"
          />
        </Box>
      </Container>
    </>
  );
}
