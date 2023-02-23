import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Alert from "@mui/material/Alert";
import LoginUtils from "./LoginUtils";
import StyleTextField from "./StyledTextField";
import useLoginForm from "@/hooks/useLoginForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import AppSnackbar from "../common/AppSnackbar";

const LoginForm = () => {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const { isLoading, onSubmit } = useLoginForm();
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
      <AppSnackbar
        messageInfo={messageInfo}
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
      />
    </Stack>
  );
};

export default LoginForm;
