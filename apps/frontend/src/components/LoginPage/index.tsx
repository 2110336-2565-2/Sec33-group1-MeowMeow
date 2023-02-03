import React from "react";
import Image from "next/image";
import LoginPageContainer from "./LoginPageContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StyledInput from "./StyledInput";
import LoginUtils from "./LoginUtils";
import Button from "@mui/material/Button";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <Image
        src="/images/loginPage/guideKai-logo.svg"
        alt="guideKai logo"
        width={57}
        height={60}
      />
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ marginTop: "12px", marginBottom: "24px" }}
      >
        GuideKai
      </Typography>
      <Stack width="100%" direction="column" spacing="28px" alignItems="start">
        <StyledInput variant="outlined" placeholder="Email" />
        <StyledInput variant="outlined" placeholder="Password" />
        <LoginUtils />
        <Button variant="contained" color="secondary" fullWidth>
          SIGN IN
        </Button>
      </Stack>

      <Typography variant="body2" component="span" marginTop="96px">
        Don’t have an account yet?{" "}
        <Typography variant="body2" color="secondary" component="span">
          Register now
        </Typography>
      </Typography>
    </LoginPageContainer>
  );
};

export default LoginPage;
