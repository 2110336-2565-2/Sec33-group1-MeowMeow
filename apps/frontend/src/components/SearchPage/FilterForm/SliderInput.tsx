import { Slider, Stack, Typography } from "@mui/material";

interface SliderInputProps {
  name: string;
  displayText?: string;
  value: number[];
  max?: number;
  onChange: (e: Event, newValue: number | number[]) => void;
}

export default function SliderInput(props: SliderInputProps) {
  const { name, displayText, value, onChange, max } = props;
  return (
    <Stack gap={2}>
      <Typography variant="body1">{displayText ?? name}</Typography>
      <Slider
        disableSwap
        name={name}
        value={value}
        min={0}
        max={max}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
}
