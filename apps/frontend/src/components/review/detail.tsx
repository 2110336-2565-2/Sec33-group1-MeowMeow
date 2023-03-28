import theme from "@/config/theme";
import { Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IDetailProps {
  id: string;
}

export default function Detail({ id }: IDetailProps) {
  const [detail, setDetail] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 200) {
    } else {
      setDetail(event.target.value);
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ marginTop: 3, marginBottom: 5 }}
    >
      <Grid
        container
        direction={"column"}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ marginTop: 1 }}
      >
        <TextField
          id={id}
          label="Tell us how you feel. Good Services?"
          placeholder="Tell us how you feel. Good Services?"
          multiline
          sx={{ width: "inherit" }}
          onChange={handleChange}
          value={detail}
        />
      </Grid>
      <Grid
        container
        sx={{ marginTop: 2, color: theme.palette.grey[700] }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {detail.length} / 200 Characters
      </Grid>
    </Grid>
  );
}
