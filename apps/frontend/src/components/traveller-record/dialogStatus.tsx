import theme from "@/config/theme";
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { statusType, buttonMapping } from "./data/recordType";

export interface IStatusDialog {
  nameButton: string;
}

export default function StatusDialog({ nameButton }: IStatusDialog) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

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
          backgroundColor: "#ffd7b8",
        }}
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
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Status: {nameButton}
            </Typography>
          </Grid>
          {buttonMapping.get(nameButton)!.map((item: string) => {
            return (
              <Box
                key={item}
                justifyContent="center"
                alignItems="center"
                sx={{ padding: "20px" }}
              >
                <Button variant="contained">{item}</Button>
              </Box>
            );
          })}
        </Grid>
      </Dialog>
    </>
  );
}
