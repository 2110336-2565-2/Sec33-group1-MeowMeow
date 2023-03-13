import { IFilterMethod } from "@/hooks/useFilterForm";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import DateInput from "./DateInput";
import SliderInput from "./SliderInput";

interface FilterFormProps {
  filterStuff: IFilterMethod;
}

export default function FilterForm({ filterStuff }: FilterFormProps) {
  const {
    tempOptions,
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
        <Typography variant="h6">Filter</Typography>
        <TextField
          label="Location"
          variant="outlined"
          placeholder="Insert place name"
          value={tempOptions.location}
          onChange={handleChangeLocation}
        />
        <SliderInput
          name="price"
          max={9999}
          displayText="Price"
          value={tempOptions.price}
          onChange={handleChangePrice}
        />
        <SliderInput
          name="rating"
          max={5}
          displayText="Rating score"
          value={tempOptions.rating}
          onChange={handleChangeRating}
        />

        <DateInput
          displayText="Date"
          startDate={tempOptions.startDate}
          endDate={tempOptions.endDate}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeEndDate={handleChangeEndDate}
        />

        <Button type="submit" variant="contained" sx={{ color: "white" }}>
          Apply
        </Button>
      </Stack>
    </Container>
  );
}
