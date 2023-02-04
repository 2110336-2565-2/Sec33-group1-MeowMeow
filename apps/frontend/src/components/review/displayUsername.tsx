import React from "react";
import Switch from "@mui/material/Switch";
import { Grid } from "@mui/material";

interface displayUsernamePropsInterface {
  isShowUsername: boolean;
  handleIsShowUsername: (isShowUsernameValue: boolean) => void;
}

export default function DisplayUsername(
  isShowProps: displayUsernamePropsInterface
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isShowProps.handleIsShowUsername(event.target.checked);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9} sx={{}}>
        Displaying username in this review
      </Grid>
      <Grid item xs={3} sx={{}}>
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <Switch
            checked={isShowProps.isShowUsername}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
