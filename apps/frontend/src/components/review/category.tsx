import { ToggleButtonGroup, ToggleButton, Grid } from "@mui/material";
import React from "react";
import CategoryBox from "./categoryBox";

var categoryName: string[][] = new Array(2);
categoryName[0] = ["Polite", "Guidance", "Funny", "Knowledgeful"]; // Good
categoryName[1] = [
  "Impolite",
  "Sexual harassment",
  "No Knowledge",
  "Not On Time",
]; // Bad

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
      sx={{ marginTop: 2 }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={5}>
          <CategoryBox text="Polite" value="Polite" />
        </Grid>
        <Grid item xs={5}>
          <CategoryBox text="Guidance" value="Guidance" />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={5}>
          <CategoryBox text="Funny" value="Funny" />
        </Grid>
        <Grid item xs={5}>
          <CategoryBox text="Knowledgeful" value="Knowledgeful" />
        </Grid>
      </Grid>
    </Grid>
  );
}
