import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Dispatch } from "react";

interface ISearchBoxProps {
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBox({
  search,
  setSearch,
  handleSearch,
}: ISearchBoxProps) {
  return (
    <Stack component="form" onSubmit={handleSearch}>
      <TextField
        placeholder="Search..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <Button type="submit">
              <Search />
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
