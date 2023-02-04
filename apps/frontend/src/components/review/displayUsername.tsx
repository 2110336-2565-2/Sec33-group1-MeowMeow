import React from "react";
import Switch from "@mui/material/Switch";
import { Grid } from "@mui/material";

export default function DisplayUsername() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9} sx={{}}>
        Displaying username in this review
      </Grid>
      <Grid item xs={3} sx={{}}>
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
