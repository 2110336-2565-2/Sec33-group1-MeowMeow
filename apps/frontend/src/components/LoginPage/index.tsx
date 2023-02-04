import LoginPageContainer from "./LoginPageContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StyleTextField from "./StyledTextField";
import LoginUtils from "./LoginUtils";
import Button from "@mui/material/Button";
import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import StyledLink from "./StyledLink";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <BrandLogo />
      <LoginForm />

      <Typography variant="body2" component="span" marginTop="96px">
        Don’t have an account yet?{" "}
        <StyledLink href="/register">
          <Typography variant="body2" color="secondary" component="span">
            Register now
          </Typography>
        </StyledLink>
      </Typography>
    </LoginPageContainer>
  );
};

export default LoginPage;
