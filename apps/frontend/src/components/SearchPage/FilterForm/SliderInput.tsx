import { Slider, Stack, Typography } from "@mui/material";

interface SliderInputProps {
  name: string;
  displayText?: string;
  value: number[];
  onChange: (e: Event, newValue: number | number[]) => void;
}

export default function SliderInput(props: SliderInputProps) {
  const { name, displayText, value, onChange } = props;
  return (
    <Stack gap={2}>
      <Typography variant="body1">{displayText ?? name}</Typography>
      <Slider
        name={name}
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
}
