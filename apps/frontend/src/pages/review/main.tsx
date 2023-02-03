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
    <Box
      sx={{
        backgroundColor: theme.palette.grey["100"],
        margin: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          fontWeight={600}
          fontSize={30}
        >
          Review
        </Grid>
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
        <Grid container xs={12} justifyContent="flex-end" sx={{ marginTop: 5 }}>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button variant="contained" sx={{ color: theme.palette.grey[100] }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
