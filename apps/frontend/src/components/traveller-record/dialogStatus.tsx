import theme from "@/config/theme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { buttonMapping, statusDetail } from "./data/statusHandle";

export interface IStatusDialog {
  nameButton: string;
}

export default function StatusDialog({ nameButton }: IStatusDialog) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const statusValue = { ...statusDetail.get(nameButton) };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{
          fontSize: { xs: 10, sm: 12, md: 16 },
          backgroundColor: statusValue.color,
        }}
        fullWidth
        onClick={handleClickOpen("paper")}
      >
        {" "}
        {nameButton}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          padding: { sm: 5, xs: 2 },
        }}
        fullWidth
      >
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <IconButton onClick={handleClose}>
            <CancelIcon style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: { sm: 2, xs: 2 } }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
            Status: {nameButton}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {statusValue.description}
            </DialogContentText>
          </DialogContent>
          {buttonMapping.get(nameButton) &&
            buttonMapping
              .get(nameButton)!
              .map((item: string, index: number) => {
                return (
                  <DialogActions key={nameButton + "-" + index}>
                    <Button variant="contained">{item}</Button>
                  </DialogActions>
                );
              })}
        </Grid>
      </Dialog>
    </>
  );
}