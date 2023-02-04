import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoginUtils from "./LoginUtils";
import StyleTextField from "./StyledTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "./types/loginForm";
import { useCallback } from "react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<ILoginForm> = useCallback((data, event) => {
    event?.preventDefault();
    console.log(data);
  }, []);
  return (
    <Stack
      component="form"
      width="100%"
      direction="column"
      spacing="20px"
      alignItems="start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyleTextField placeholder="Email" {...register("email")} />
      <StyleTextField
        autoComplete=""
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <LoginUtils />
      <Button variant="contained" color="secondary" fullWidth type="submit">
        SIGN IN
      </Button>
    </Stack>
  );
};

export default LoginForm;
