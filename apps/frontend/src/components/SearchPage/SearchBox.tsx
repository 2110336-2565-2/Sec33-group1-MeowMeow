import { Filter, FilterList, Search } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, useState } from "react";
import FilterForm from "./FilterForm";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Stack component="form" onSubmit={handleSearch}>
      <TextField
        placeholder="Search..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <>
              <Button type="submit">
                <Search />
              </Button>
              <Badge badgeContent={10} max={9} color="primary">
                <IconButton
                  color="primary"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <FilterList color="primary" />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                >
                  <FilterForm />
                </Drawer>
              </Badge>
            </>
          ),
        }}
      />
    </Stack>
  );
}
