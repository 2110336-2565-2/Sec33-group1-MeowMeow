import {
  Box,
  Button,
  Container,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IFilterOptions } from "../types";
import SliderInput from "./SliderInput";

export default function FilterForm() {
  const [options, setOptions] = useState<IFilterOptions>({
    location: "",
    price: [0, 1000],
    rating: [0, 5],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: Event, newValue: number | number[]) => {
    if (!e.target) return;

    setOptions((prev) => ({
      ...prev,
      [e.target.name]: newValue as number[], // pull key name from event
    }));
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <Stack
        gap={4}
        sx={{
          my: 4,
          mx: 2,
        }}
      >
        <Typography variant="h6">Filter</Typography>
        <TextField
          label="Location"
          variant="outlined"
          placeholder="Insert place name"
          value={options.location}
          onChange={(e) =>
            setOptions((prev) => ({
              ...prev,
              location: e.target.value, // specify key name
            }))
          }
        />
        <SliderInput
          name="price"
          displayText="Price"
          value={options.price}
          onChange={handleChange}
        />
        <SliderInput
          name="rating"
          displayText="Rating score"
          value={options.rating}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Apply
        </Button>
      </Stack>
    </Container>
  );
}
