import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect } from "react";

interface categoryBoxProps {
  id: number;
  text: string;
  value: string;
  reset: boolean;
  handleCategory: (categoryValue: string | null, index: number) => void;
}

export default function CategoryBox(boxProps: categoryBoxProps) {
  const [value, setValue] = React.useState("");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    boxProps.handleCategory(newAlignment, boxProps.id);
    setValue(newAlignment);
  };

  useEffect(() => {
    setValue("");
  }, [boxProps.reset]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 2 }}
    >
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton sx={{ width: 200 }} value={boxProps.value}>
          {boxProps.text}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
