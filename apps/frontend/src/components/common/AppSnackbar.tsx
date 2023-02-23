import { SnackbarMessage } from "@/hooks/types/snackbarMessage";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { SyntheticEvent } from "react";

interface IAppSnackbarProps {
  isOpen: boolean;
  messageInfo?: SnackbarMessage;
  onClose?: (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void;

  onExit?: (node: HTMLElement) => void;
}

const AppSnackbar = ({
  messageInfo,
  isOpen,
  onClose,
  onExit,
}: IAppSnackbarProps) => {
  return (
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
  );
};

export default AppSnackbar;
