import Category from "@/components/review/category";
import Star from "@/components/review/star";
import theme from "@/config/theme";
import { Box, Grid, Paper, styled } from "@mui/material";
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
          <Item> 5 </Item>
        </Grid>
        <Grid item xs={12}>
          <Item> 6 </Item>
        </Grid>
        <Grid item xs={12}>
          <Item> 7 </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
