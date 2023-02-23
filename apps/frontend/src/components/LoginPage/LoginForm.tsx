import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Alert from "@mui/material/Alert";
import LoginUtils from "./LoginUtils";
import StyleTextField from "./StyledTextField";
import useLoginForm from "@/hooks/useLoginForm";
import useSnackbar from "@/hooks/useSnackbar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";

const LoginForm = () => {
  const { onClose, onExit, isOpen, messageInfo } = useSnackbar();
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={messageInfo ? messageInfo.key : undefined}
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}
        sx={{ width: "100vw", left: "0px" }}
        TransitionProps={{ onExited: onExit }}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert
          severity={messageInfo?.severity ?? "error"}
          variant="filled"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="500" variant="subtitle1">
            {messageInfo?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default LoginForm;
