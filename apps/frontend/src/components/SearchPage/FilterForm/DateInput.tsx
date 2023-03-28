import { Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateInputProps {
  displayText?: string;
  startDate: Date | null;
  endDate: Date | null;

  handleChangeStartDate: (newValue: Date | null) => void;
  handleChangeEndDate: (newValue: Date | null) => void;
}

export default function DateInput(props: DateInputProps) {
  const {
    displayText,
    endDate,
    startDate,
    handleChangeStartDate,
    handleChangeEndDate,
  } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap={2}>
        <Typography variant="body1">{displayText}</Typography>
        <DatePicker
          disablePast
          label="Start date"
          value={startDate}
          onChange={handleChangeStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          disablePast
          label="End date"
          value={endDate}
          onChange={handleChangeEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
