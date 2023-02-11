import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoginUtils from "./LoginUtils";
import StyleTextField from "./StyledTextField";
import apiClient from "@/utils/apiClient";
import { FormEventHandler, useCallback } from "react";
import { ILoginForm } from "./types/loginForm";

const LoginForm = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value;
      try {
        await apiClient.post<ILoginForm>("/auth/sign-in", {
          email,
          password,
        });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return (
    <Stack
      component="form"
      width="100%"
      direction="column"
      spacing="20px"
      alignItems="start"
      onSubmit={onSubmit}
    >
      <StyleTextField placeholder="Email" id="email" />
      <StyleTextField
        autoComplete=""
        type="password"
        id="password"
        placeholder="Password"
      />
      <LoginUtils />
      <Button variant="contained" color="secondary" fullWidth type="submit">
        SIGN IN
      </Button>
    </Stack>
  );
};

export default LoginForm;
