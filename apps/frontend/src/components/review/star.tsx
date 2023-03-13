import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";
import { idText } from "typescript";
import { useState } from "react";

const labels: { [index: string]: string } = {
  0: "Not Recommended",
  0.5: "Very Bad",
  1: "Bad",
  1.5: "Very Not Okay ",
  2: "Not Okay",
  2.5: "Medium",
  3: "Okay",
  3.5: "Good",
  4: "Good Guide!",
  4.5: "Excellent",
  5: "Excellent! Guide",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

interface starProps {
  // star: number | null;
  // handleStar: (num: number | null) => void;
  id: string;
}

export default function Star({ id }: starProps) {
  const [star, setStar] = useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);

  const handleStar = (starValue: number | null) => {
    setStar(starValue);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid item>
        <Rating
          name={id}
          value={star}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            handleStar(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          id={id}
        />
      </Grid>
      <Grid item>
        {star !== null && (
          <Box sx={{ marginTop: 2 }}>{labels[hover !== -1 ? hover : star]}</Box>
        )}
      </Grid>
    </Grid>
  );
}
