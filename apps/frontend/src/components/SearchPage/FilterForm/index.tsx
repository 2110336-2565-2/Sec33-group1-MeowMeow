import { IFilterMethod } from "@/hooks/useFilterForm";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import SliderInput from "./SliderInput";

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

        {/* <DateInput
          displayText="Date"
          startDate={tempOptions.startDate}
          endDate={tempOptions.endDate}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeEndDate={handleChangeEndDate}
        /> */}

        <Button type="submit" variant="contained" sx={{ color: "white" }}>
          Apply
        </Button>
      </Stack>
    </Container>
  );
};

export default FilterForm;
