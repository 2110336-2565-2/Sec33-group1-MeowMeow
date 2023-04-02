import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import useRegisterForm from "@/hooks/useRegisterForm";
import useSnackbar from "@/hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const RegisterForm = () => {
  const { onClose, onExit, isOpen, messageInfo } = useSnackbar();
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={messageInfo ? messageInfo.key : undefined}
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}
        sx={{
          width: "100vw",
          left: "0px",
        }}
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
          <Typography
            fontWeight="500"
            textTransform="capitalize"
            variant="subtitle1"
          >
            {messageInfo?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default RegisterForm;
