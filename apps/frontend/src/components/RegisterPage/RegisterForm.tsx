import { FormEventHandler, useCallback } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import { REGISTER_INPUT_IDs } from "@/constants/RegisterPage";

const RegisterForm = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((event) => {
    event.preventDefault();
    const formBody = REGISTER_INPUT_IDs.reduce((prev, formId) => {
      prev[formId] = event.currentTarget[formId].value;
      return prev;
    }, {} as { [key: string]: string });
  }, []);

  return (
    <Stack
      component="form"
      direction="column"
      spacing="16px"
      width="100%"
      onSubmit={onSubmit}
    >
      <Stack direction="row" spacing="20px">
        <StyleTextField placeholder="First name" id="firstName" />
        <StyleTextField placeholder="Last name" id="lastName" />
      </Stack>
      <StyleTextField placeholder="Username" id="userName" />
      <StyleTextField placeholder="Email" id="email" />
      <StyleTextField type="password" placeholder="Password" id="password" />
      <StyleTextField
        type="password"
        placeholder="Confirm Password"
        id="confirmPassword"
        helperText="Minimum length is 8 characters."
        FormHelperTextProps={{
          style: {
            marginLeft: 0,
            marginRight: 0,
            color: "#475569",
          },
        }}
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
