import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#F46D21",
    },
    secondary: {
      main: "#1976D2",
    },
    error: {
      main: red.A400,
    },
    grey: {
      100: "#F3F4F6",
      400: "#D4D5D6",
      700: "#475569",
    },
    text: {
      primary: "#000000",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
    fontSize: 16,
  },
});
export default theme;
