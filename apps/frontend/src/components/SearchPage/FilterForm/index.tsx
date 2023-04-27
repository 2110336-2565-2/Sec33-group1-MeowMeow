import { IFilterMethod } from "@/hooks/useFilterForm";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import SliderInput from "./SliderInput";
import { maxFee, maxRating, stepFee, stepRating } from "@/constants/SearchPage";

interface FilterFormProps {
  filterStuff: IFilterMethod;
}

const FilterForm = ({ filterStuff }: FilterFormProps) => {
  const {
    tempOptions,
    handleChangeLocation,
    handleChangePrice,
    handleChangeRating,
    handleSubmit,
    reset,
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">Filter</Typography>
          <Button variant="outlined" onClick={reset}>
            clear
          </Button>
        </Stack>
        <TextField
          label="Location"
          variant="outlined"
          placeholder="Insert place name"
          value={tempOptions.location}
          onChange={handleChangeLocation}
        />
        <SliderInput
          name="price"
          max={maxFee}
          step={stepFee}
          displayText="Max Price"
          value={tempOptions.maxPrice}
          onChange={handleChangePrice}
        />
        <SliderInput
          name="rating"
          max={maxRating}
          step={stepRating}
          displayText="Min Rating Score"
          value={tempOptions.minRating}
          onChange={handleChangeRating}
        />
        <Button type="submit" variant="contained" sx={{ color: "white" }}>
          Apply
        </Button>
      </Stack>
    </Container>
  );
};

export default FilterForm;
