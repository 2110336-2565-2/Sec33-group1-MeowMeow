import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

const ResponsiveBox = styled(Box)(({ theme }) => {
  return {
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "24px",
      margin: "12px",
      borderRadius: "12px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "500px",
      padding: "32px",
      borderRadius: "16px",
    },
    [theme.breakpoints.up("md")]: {
      width: "720px",
      padding: "50px",
      borderRadius: "20px",
    },
  };
});

interface IRegisterPageContainerProps {
  children?: ReactNode;
}

const RegisterPageContainer = ({ children }: IRegisterPageContainerProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(90deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)",
      }}
    >
      <ResponsiveBox>{children}</ResponsiveBox>
    </Box>
  );
};

export default RegisterPageContainer;
