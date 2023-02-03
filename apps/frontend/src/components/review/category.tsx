import { ToggleButtonGroup, ToggleButton, Grid } from "@mui/material";
import React from "react";
import CategoryBox from "./categoryBox";

export default function Category() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <CategoryBox text="Polite" value="Polite" />
        </Grid>
        <Grid item xs={4}>
          <CategoryBox text="Guidance" value="Guidance" />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <CategoryBox text="Funny" value="Funny" />
        </Grid>
        <Grid item xs={4}>
          <CategoryBox text="Knowledgeful" value="Knowledgeful" />
        </Grid>
      </Grid>
    </Grid>
  );
}
