import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";

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
  star: number | null;
  handleStar: (num: number | null) => void;
}

export default function Star(starProps: starProps) {
  const [hover, setHover] = React.useState(-1);

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
          name="hover-feedback"
          value={starProps.star}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            starProps.handleStar(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </Grid>
      <Grid item>
        {starProps.star !== null && (
          <Box sx={{ marginTop: 2 }}>
            {labels[hover !== -1 ? hover : starProps.star]}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
