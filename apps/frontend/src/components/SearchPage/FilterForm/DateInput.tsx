import { Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface DateInputProps {
  displayText?: string;
  startDate: Date | null;
  endDate: Date | null;

  handleChangeStartDate: (newValue: Date | null) => void;
  handleChangeEndDate: (newValue: Date | null) => void;
}

const DateInput = (props: DateInputProps) => {
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
        <DateTimePicker
          disablePast
          label="Start date"
          value={startDate}
          onChange={handleChangeStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          disablePast
          label="End date"
          minDate={startDate ? startDate : undefined}
          value={endDate}
          onChange={handleChangeEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateInput;
