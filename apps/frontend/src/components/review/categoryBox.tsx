import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

interface CategoryBoxProps {
  text: string;
  value: string;
}

export default function CategoryBox(props: CategoryBoxProps) {
  const [alignment, setAlignment] = React.useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 5 }}
    >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton sx={{ width: 200 }} value={props.value}>
          {" "}
          {props.text}{" "}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
