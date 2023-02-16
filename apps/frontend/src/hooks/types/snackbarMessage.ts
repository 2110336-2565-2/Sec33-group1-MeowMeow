import { AlertColor } from "@mui/material/Alert";

export interface SnackbarMessage {
  message: string;
  key: number;
  severity: AlertColor;
}
