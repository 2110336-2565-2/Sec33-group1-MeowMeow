import { IFilterMethod } from "@/hooks/useFilterForm";
import { FilterList, Search } from "@mui/icons-material";
import { Button, Drawer, IconButton, Stack, TextField } from "@mui/material";
import { Dispatch, useState } from "react";
import FilterForm from "./FilterForm";

interface ISearchBoxProps {
  tempSearch: string;
  filterStuff: IFilterMethod;
  setTempSearch: Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBox(props: ISearchBoxProps) {
  const { tempSearch, setTempSearch, handleSearch, filterStuff } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Stack component="form" onSubmit={handleSearch}>
      <TextField
        placeholder="Search..."
        fullWidth
        value={tempSearch}
        onChange={(e) => setTempSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <>
              <Button type="submit">
                <Search />
              </Button>
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
                <FilterForm
                  filterStuff={filterStuff} // props drilling
                />
              </Drawer>
            </>
          ),
        }}
      />
    </Stack>
  );
}
