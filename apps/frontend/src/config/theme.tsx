import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// Create a theme instance.
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 16,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
