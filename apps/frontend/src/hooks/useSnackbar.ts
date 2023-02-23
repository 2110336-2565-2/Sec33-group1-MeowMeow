import { NotificationContext } from "@/context/NotificationContext";
import { SnackbarMessage } from "@/hooks/types/snackbarMessage";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import {
  useState,
  useCallback,
  SyntheticEvent,
  useEffect,
  useContext,
} from "react";

const useCustomSnackbar = () => {
  const { notificationLists, removeNotification } =
    useContext(NotificationContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>();
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
    if (notificationLists.length && !messageInfo) {
      setMessageInfo({ ...notificationLists[0] });
      removeNotification();
      setOpen(true);
    }
    if (notificationLists.length && messageInfo && isOpen) {
      setOpen(false);
    }
  }, [notificationLists, messageInfo, isOpen]);

  return { onClose, onExit, isOpen, messageInfo };
};

export default useCustomSnackbar;
