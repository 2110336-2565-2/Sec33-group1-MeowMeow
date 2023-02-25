import { TFilterForm } from "@/hooks/useFilterForm";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import DateInput from "./DateInput";
import SliderInput from "./SliderInput";

interface FilterFormProps {
  filterStuff: TFilterForm;
}

export default function FilterForm({ filterStuff }: FilterFormProps) {
  const {
    options,
    handleChangeLocation,
    handleChangePrice,
    handleChangeRating,
    handleChangeStartDate,
    handleChangeEndDate,
    handleSubmit,
  } = filterStuff;

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <Stack
        gap={4}
        sx={{
          my: 4,
          mx: 2,
        }}
      >
        {
          JSON.stringify(options) // tests
        }
        <Typography variant="h6">Filter</Typography>
        <TextField
          label="Location"
          variant="outlined"
          placeholder="Insert place name"
          value={options.location}
          onChange={handleChangeLocation}
        />
        <SliderInput
          name="price"
          max={9999}
          displayText="Price"
          value={options.price}
          onChange={handleChangePrice}
        />
        <SliderInput
          name="rating"
          max={5}
          displayText="Rating score"
          value={options.rating}
          onChange={handleChangeRating}
        />

        <DateInput
          displayText="Date"
          startDate={options.startDate}
          endDate={options.endDate}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeEndDate={handleChangeEndDate}
        />

        <Button type="submit" variant="contained">
          Apply
        </Button>
      </Stack>
    </Container>
  );
}
