import { SnackbarMessage } from "@/hooks/types/snackbarMessage";
import { AlertColor } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState, useCallback, SyntheticEvent, useEffect } from "react";

const useCustomSnackbar = () => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>();
  const onAddSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackPack((prev) => [
      ...prev,
      { key: new Date().getTime(), message, severity },
    ]);
  }, []);
  const onClose = useCallback(
    (_: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    },
    []
  );
  const onExit = useCallback(() => {
    setMessageInfo(undefined);
  }, []);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && isOpen) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, isOpen]);

  return { onAddSnackbar, onClose, onExit, isOpen, messageInfo };
};

export default useCustomSnackbar;
