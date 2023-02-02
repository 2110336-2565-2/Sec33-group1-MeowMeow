import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import theme from "@/config/theme";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ListComponent from "./listComponent";
import QuiltedImageList from "./imageWindow";

export default function Achievement() {
  return (
    <Box sx={{ width: "100%", height: "580px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={4}
            paddingLeft={10}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              height={90}
            ></Box>
            <Grid
              item
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

        <Grid item xs={6}>
          <QuiltedImageList />
        </Grid>
      </Grid>
    </Box>
  );
}
