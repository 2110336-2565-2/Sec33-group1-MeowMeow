import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Navbar from "../common/Navbar";
import PostFeed from "./PostFeed";

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: "2rem",
        }}
      >
        <TextField
          placeholder="Search..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <PostFeed />
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
