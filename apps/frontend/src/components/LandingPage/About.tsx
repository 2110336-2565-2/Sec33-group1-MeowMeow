import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "@/config/theme";
import ListComponent from "./ListComponent";
import ImageWindow from "./ImageWindow";

export default function About() {
  return (
    <Box maxWidth="xl" sx={{ width: "100%", height: "auto" }}>
      <Grid container spacing={12}>
        <Grid item sm={12} md={6}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={4}
            sx={{
              padding: "32px",
            }}
          >
            <Grid
              item
              xs={3}
              style={{
                height: "40",
                fontSize: "28px",
                color: theme.palette.primary["main"],
              }}
            >
              What’s GuideKai?
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                height: "auto",
                fontSize: "35px",
                fontWeight: "bold",
              }}
            >
              Why Join GuideKai?
            </Grid>
            <Grid item xs={3}>
              GuideKai provides convenient functions to use in finding your
              dream guide. No matter where you go, GuideKai has many guides for
              you, and many travelers look for capable guides like you!
            </Grid>
            <Grid item xs={3}>
              <Grid item xs={12} style={{ padding: "5px" }}>
                <ListComponent text={"Guide"} />
                <ListComponent text={"Tourist"} />
                <ListComponent text={"All In One Service"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <ImageWindow />
        </Grid>
      </Grid>
    </Box>
  );
}
