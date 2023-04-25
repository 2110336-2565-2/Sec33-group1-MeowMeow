import { Slider, Stack, Typography } from "@mui/material";

interface SliderInputProps {
  name: string;
  step: number;
  displayText?: string;
  value: number;
  max?: number;
  onChange: (event: Event, value: number | number[]) => void;
}

const SliderInput = (props: SliderInputProps) => {
  const { name, displayText, value, onChange, max, step } = props;
  return (
    <Stack gap={2}>
      <Typography variant="body1">{displayText ?? name}</Typography>
      <Slider
        disableSwap
        name={name}
        value={value}
        min={0}
        max={max}
        step={step}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
};
export default SliderInput;
