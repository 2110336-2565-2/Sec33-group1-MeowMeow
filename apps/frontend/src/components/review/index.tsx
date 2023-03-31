import Detail from "@/components/review/detail";
import Star from "@/components/review/star";
import theme from "@/config/theme";
import useReviewForm from "@/hooks/useReviewForm";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import {
  Alert,
  Button,
  DialogActions,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface reviewProps {
  handleDialog: () => void;
}

export default function Review(props: reviewProps) {
  const { onClose, onExit, isOpen, messageInfo } = useCustomSnackbar();
  const { onSubmit, isLoading } = useReviewForm();

  if (isLoading) {
    return (
      <Grid
        container
        sx={{
          backgroundColor: "#ffffff",
          padding: { sm: 5, xs: 2 },
          paddingTop: 2,
          borderRadius: 5,
        }}
        width={"auto"}
        height={"auto"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography> Loading .... </Typography>
      </Grid>
    );
  }

  return (
    <Stack
      component="form"
      direction="column"
      spacing="16px"
      width="100%"
      onSubmit={onSubmit}
    >
      <Grid
        container
        sx={{
          backgroundColor: "#ffffff",
          padding: { sm: 5, xs: 2 },
          paddingTop: 2,
          borderRadius: 5,
        }}
        width={"auto"}
        height={"auto"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8} sm={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            fontWeight={600}
            fontSize={30}
            sx={{ marginBottom: 2 }}
          >
            Review
          </Grid>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item xs={12}>
              Natee Niparnan
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <Star id="score" />
            </Grid>
            <Grid item xs={12}>
              <Detail id="text" />
            </Grid>
            <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
              <Grid item>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ color: theme.palette.grey[100] }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
}
