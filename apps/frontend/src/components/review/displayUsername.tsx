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
      <Grid item xs={6} sx={{ marginLeft: 12 }}>
        Displaying username in this review
      </Grid>
      <Grid item xs={1} sx={{ marginLeft: 19 }}>
        <Grid container justifyContent={"flex-end"}>
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
