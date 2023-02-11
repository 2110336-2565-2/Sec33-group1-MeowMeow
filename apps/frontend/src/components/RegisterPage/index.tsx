import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BrandLogo from "../LoginPage/BrandLogo";
import StyleTextField from "../LoginPage/StyledTextField";
import RegisterPageContainer from "./RegisterPageContainer";
import { Typography } from "@mui/material";
import StyledLink from "../LoginPage/StyledLink";
import RegisterForm from "./RegisterForm";
import PrivacyPolicy from "./PrivacyPolicy";

const RegisterPage = () => {
  return (
    <RegisterPageContainer>
      <BrandLogo />
      <RegisterForm />
      <PrivacyPolicy />
      <Typography variant="body2" component="span" marginTop="20px">
        Already have an account?{" "}
        <StyledLink href="/login">
          <Typography variant="body2" color="secondary" component="span">
            Sign in
          </Typography>
        </StyledLink>
      </Typography>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
