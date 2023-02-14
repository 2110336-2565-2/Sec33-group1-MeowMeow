import theme from "@/config/theme";
import { Button, Dialog, DialogProps, Grid, IconButton } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Review from "../../pages/review";
import CreateIcon from "@mui/icons-material/Create";

export default function ReviewDialog() {
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
        variant="outlined"
        size="small"
        startIcon={<CreateIcon fontSize="inherit" />}
        sx={{ fontSize: { xs: 10, sm: 12, md: 16 } }}
        onClick={handleClickOpen("paper")}
      >
        {" "}
        WRITE REVIEW
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        sx={{
          padding: { sm: 5, xs: 2 },
        }}
      >
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <IconButton onClick={handleClose}>
            <CancelIcon style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Grid>
        <Review handleDialog={handleClose} />
      </Dialog>
    </>
  );
}
