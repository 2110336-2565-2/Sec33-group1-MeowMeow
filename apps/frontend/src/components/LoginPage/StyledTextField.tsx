import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyleTextField = styled(TextField)(({ theme }) => {
  return {
    width: "100%",
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid rgba(0, 0, 0, 0.42)",
      },
      "&:hover fieldset": {
        border: "2px solid #F46D21",
      },
    },
    "& .Mui-disabled": {
      "&:hover fieldset": {
        border: "2px solid rgba(0, 0, 0, 0.42)",
      },
    },
  };
});

export default StyleTextField;
