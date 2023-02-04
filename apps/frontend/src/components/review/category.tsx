import { ToggleButtonGroup, ToggleButton, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CategoryBox from "./categoryBox";

var categoryName: string[][] = new Array(2);
categoryName[0] = ["Polite", "Guidance", "Funny", "Knowledgeful"]; // Good
categoryName[1] = [
  "Impolite",
  "Sexual harassment",
  "No Knowledge",
  "Not On Time",
]; // Bad

interface categoryProps {
  point: number | null;
  handleCategory: (categoryValue: string | null, index: number) => void;
}

var indicator = 0;
export default function Category(categoryProps: categoryProps) {
  const [reset, setReset] = React.useState(false);
  if (categoryProps.point == null || categoryProps.point < 2.5) {
    indicator = 1;
  } else {
    indicator = 0;
  }

  useEffect(() => {
    for (var i = 0; i < 4; i++) {
      categoryProps.handleCategory(null, i);
    }
    setReset(!reset);
  }, [indicator]);

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
          <CategoryBox
            id={0}
            text={categoryName[indicator][0]}
            value={categoryName[indicator][0]}
            handleCategory={categoryProps.handleCategory}
            reset={reset}
          />
        </Grid>
        <Grid item xs={5}>
          <CategoryBox
            id={1}
            text={categoryName[indicator][1]}
            value={categoryName[indicator][1]}
            handleCategory={categoryProps.handleCategory}
            reset={reset}
          />
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
          <CategoryBox
            id={2}
            text={categoryName[indicator][2]}
            value={categoryName[indicator][2]}
            handleCategory={categoryProps.handleCategory}
            reset={reset}
          />
        </Grid>
        <Grid item xs={5}>
          <CategoryBox
            id={3}
            text={categoryName[indicator][3]}
            value={categoryName[indicator][3]}
            handleCategory={categoryProps.handleCategory}
            reset={reset}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
