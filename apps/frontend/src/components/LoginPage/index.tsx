import LoginPageContainer from "./LoginPageContainer";
import Typography from "@mui/material/Typography";
import BrandLogo from "./BrandLogo";
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
