import theme from "@/config/theme";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect } from "react";
import postViewModel, { IPost } from "./viewModel/post";

export interface IStatusPost {
  postId: number;
}

export default function PostDialog({ postId }: IStatusPost) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const data = postViewModel(postId);
  const prev = React.useRef(data);
  const [post, setPost] = React.useState<IPost>({} as IPost);

  useEffect(() => {
    setPost(data);
  }, [prev.current !== data]);

  // console.log("Post: ", post);

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
          backgroundColor: "#faefcd",
        }}
        fullWidth
        onClick={handleClickOpen("paper")}
      >
        {" "}
        {"See Post"}
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
            {post.title}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography variant="body1" component="span">
                  <b> Content: </b> {post.content}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" component="span">
                  <b> Fee: </b> {post.fee}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" component="span">
                  <b> Max Participant: </b> {post.maxParticipant}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" component="span">
                  <b> Contact Info: </b> {post.contactInfo}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  <Typography variant="body1" component="span">
                    <b> Locations: </b>
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {post.locations?.map((location, index) => (
                      <Chip
                        key={index}
                        label={location}
                        variant="outlined"
                        sx={{
                          backgroundColor: theme.palette.grey[300],
                          color: theme.palette.primary.contrastText,
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  <Typography variant="body1" component="span">
                    <b> Tags: </b>
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {post.tags?.map((location, index) => (
                      <Chip
                        key={index}
                        label={location}
                        variant="outlined"
                        sx={{
                          backgroundColor: theme.palette.grey[300],
                          color: theme.palette.primary.contrastText,
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </>
  );
}
