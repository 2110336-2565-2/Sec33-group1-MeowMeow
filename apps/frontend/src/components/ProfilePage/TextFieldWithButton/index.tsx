import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import StyledTextField from "@/components/LoginPage/StyledTextField";
import { useState } from "react";

interface ITextFieldWithButtonProps {
  placeholder: string;
  label: string;
  onClick: (text: string) => void;
}

const TextFieldWithButton = (props: ITextFieldWithButtonProps) => {
  const [input, setInput] = useState<string>("");
  const { onClick, placeholder, label } = props;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="start"
      spacing={"8px"}
    >
      <StyledTextField
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        label={label}
        placeholder={placeholder}
      />
      <Button
        variant="outlined"
        disabled={!input}
        onClick={() => {
          onClick(input);
        }}
      >
        +
      </Button>
    </Stack>
  );
};

export default TextFieldWithButton;
