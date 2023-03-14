import { Stack, Button, TextField, TextFieldProps } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function GuidePostForm() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(undefined));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <Stack component="form" direction="column" spacing="16px" width="100%">
      <TextField id="tripName" label="Trip Name" variant="outlined" />
      <Stack direction="row" spacing="20px">
        <TextField
          id="province"
          label="Province"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField
          id="district"
          label="District"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Stack>
      <Stack direction="row" spacing="20px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...params} sx={{ width: "100%" }} />
            )}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...params} sx={{ width: "100%" }} />
            )}
          />
        </LocalizationProvider>
      </Stack>
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        sx={{ width: "100%" }}
      />
      <Stack direction="row" spacing="20px">
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
        />
        <TextField
          id="maxParticipant"
          label="Max Participant"
          variant="outlined"
          type="number"
          sx={{ width: "100%" }}
        />
      </Stack>
      <TextField
        id="lineid"
        label="Line ID"
        variant="outlined"
        sx={{ width: "100%" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ color: "white" }}
      >
        Create
      </Button>
    </Stack>
  );
}
