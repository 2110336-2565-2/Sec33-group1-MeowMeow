import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "./types/registerForm";
import { useCallback } from "react";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<IRegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<IRegisterForm> = useCallback((data, event) => {
    event?.preventDefault();
    console.log(data);
  }, []);

  return (
    <Stack
      component="form"
      direction="column"
      spacing="16px"
      width="100%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing="20px">
        <StyleTextField placeholder="First name" {...register("firstName")} />
        <StyleTextField placeholder="Last name" {...register("lastName")} />
      </Stack>
      <StyleTextField placeholder="Username" {...register("userName")} />
      <StyleTextField placeholder="Email" {...register("email")} />
      <StyleTextField
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <StyleTextField
        type="password"
        placeholder="Confirm Password"
        helperText="Minimum length is 8 characters."
        FormHelperTextProps={{
          style: {
            marginLeft: 0,
            marginRight: 0,
            color: "#475569",
          },
        }}
        {...register("confirmPassword")}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ color: "white" }}
      >
        REGISTER
      </Button>
    </Stack>
  );
};

export default RegisterForm;
