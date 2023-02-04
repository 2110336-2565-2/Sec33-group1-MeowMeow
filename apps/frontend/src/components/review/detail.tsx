import theme from "@/config/theme";
import { Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface detailPropsInterface {
  detail: string;
  handleDetail: (detailValue: string) => void;
}

export default function Detail(detailProps: detailPropsInterface) {
  const [count, setCount] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 200) {
    } else {
      detailProps.handleDetail(event.target.value);
      setCount(event.target.value.length);
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ marginTop: 5, marginBottom: 5 }}
    >
      <Grid
        container
        direction={"column"}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ marginTop: 1 }}
      >
        <TextField
          id="outlined-textarea"
          label="Tell us how you feel. Good Services?"
          placeholder="Tell us how you feel. Good Services?"
          multiline
          onChange={handleChange}
          sx={{ width: "inherit" }}
          value={detailProps.detail}
        />
      </Grid>
      <Grid
        container
        sx={{ marginTop: 2, color: theme.palette.grey[700] }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {count} / 200 Characters
      </Grid>
    </Grid>
  );
}
