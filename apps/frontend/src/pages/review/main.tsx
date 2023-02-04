import Category from "@/components/review/category";
import Detail from "@/components/review/detail";
import Star from "@/components/review/star";
import DisplayUsername from "@/components/review/displayUsername";
import theme from "@/config/theme";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Review() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.grey["100"],
        margin: 5,
        padding: 5,
        borderRadius: 5,
      }}
      width={583}
      height={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          fontWeight={600}
          fontSize={30}
        >
          Review
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            Natee Niparnan
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Star />
          </Grid>
          <Grid item xs={12}>
            <Category />
          </Grid>
          <Grid item xs={12}>
            <Detail />
          </Grid>
          <Grid item xs={12}>
            <DisplayUsername />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                sx={{ color: theme.palette.grey[100] }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
