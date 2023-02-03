import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)(({ theme }) => {
  return {
    width: "100%",
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid rgba(0, 0, 0, 0.42)",
      },
    },
  };
});

export default StyledInput;
