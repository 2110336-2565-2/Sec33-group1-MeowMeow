import theme from "@/config/theme";
import { Box, Grid, TextField } from "@mui/material";
import React from "react";

export default function Detail() {
  const [comment, setComment] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [IsExceed, setIsExceed] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (count >= 200) {
      setIsExceed(true);
    } else {
      setComment(event.target.value);
      setCount(count + 1);
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
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 1 }}
      >
        <TextField
          id="outlined-textarea"
          label="Tell us how you feel. Good Services?"
          placeholder="Tell us how you feel. Good Services?"
          multiline
          InputProps={{
            readOnly: IsExceed,
          }}
          onChange={handleChange}
          sx={{ width: 600 }}
        />
      </Grid>
      <Grid
        container
        sx={{ marginTop: 2, marginLeft: 12, color: theme.palette.grey[700] }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {count} / 200 Characters
      </Grid>
    </Grid>
  );
}
