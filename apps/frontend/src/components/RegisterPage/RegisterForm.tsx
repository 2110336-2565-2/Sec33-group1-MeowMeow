import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import useRegisterForm from "@/hooks/useRegisterForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import AppSnackbar from "../common/AppSnackbar";

const RegisterForm = () => {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const { onSubmit, isLoading } = useRegisterForm();

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
      <StyleTextField placeholder="Username" id="username" />
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
      <AppSnackbar
        messageInfo={messageInfo}
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
      />
    </Stack>
  );
};

export default RegisterForm;
