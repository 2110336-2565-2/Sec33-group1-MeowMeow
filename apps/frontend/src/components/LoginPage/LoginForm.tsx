import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoginUtils from "./LoginUtils";
import StyleTextField from "./StyledTextField";
import useLoginForm from "@/hooks/useLoginForm";
import useSnackbar from "@/hooks/useSnackbar";
import Typography from "@mui/material/Typography";

const LoginForm = () => {
  const { onAddSnackbar, onClose, onExit, isOpen, messageInfo } = useSnackbar();
  const { isLoading, onSubmit } = useLoginForm({
    onError: onAddSnackbar,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={messageInfo ? messageInfo.key : undefined}
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}
        sx={{ width: "75%" }}
        TransitionProps={{ onExited: onExit }}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="500">{messageInfo?.message}</Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default LoginForm;
