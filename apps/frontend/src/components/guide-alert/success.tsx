import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "@/config/theme";
import ContainerPostAlert from "./container";

export default function PostSuccess() {
  return (
    <ContainerPostAlert>
      <Card
        sx={{ textAlign: "center", alignItems: "center", width: "fit-content" }}
      >
        <CardContent>
          <CheckCircleIcon
            sx={{
              color: theme.palette.success.main,
              width: "80px",
              height: "80px",
            }}
          />
          <Typography variant="h4" component="div">
            Post Success
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Your post has been successfully create.
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: theme.palette.success.main }}
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Done
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </ContainerPostAlert>
  );
}
