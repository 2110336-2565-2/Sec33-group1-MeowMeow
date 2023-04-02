import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const defaultTheme = createTheme();

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
      light: "#f5d0ab",
    },
    secondary: {
      main: "#1976D2",
      light: "#94d8ff",
    },
    error: {
      main: "#ff8080",
    },
    grey: {
      100: "#F3F4F6",
      400: "#D4D5D6",
      700: "#475569",
    },
    text: {
      primary: "#000000",
    },
    info: {
      main: "#b0fff3",
    },
    success: {
      main: "#9dd49d",
    },
    warning: {
      main: "#ffec8c",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 16,
    body2: {
      lineHeight: 1.5,
      [defaultTheme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
