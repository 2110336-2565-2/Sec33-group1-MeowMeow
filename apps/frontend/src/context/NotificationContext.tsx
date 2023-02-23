import { SnackbarMessage } from "@/hooks/types/snackbarMessage";
import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useCallback, useState } from "react";

interface INotificationContext {
  notificationLists: SnackbarMessage[];
  addNotification: (message: string, severity: AlertColor) => void;
  removeNotification: () => void;
}

interface INotificationProviderProps {
  children?: ReactNode;
}

const initialContext: INotificationContext = {
  notificationLists: [],
  addNotification: () => {},
  removeNotification: () => {},
};

export const NotificationContext =
  createContext<INotificationContext>(initialContext);

const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const [notificationLists, setNotificationLists] = useState<SnackbarMessage[]>(
    []
  );
  const addNotification = useCallback(
    (message: string, severity: AlertColor) => {
      setNotificationLists((prev) => {
        return [...prev, { key: new Date().getTime(), message, severity }];
      });
    },
    []
  );

  const removeNotification = useCallback(() => {
    setNotificationLists((prev) => prev.slice(1));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notificationLists, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
