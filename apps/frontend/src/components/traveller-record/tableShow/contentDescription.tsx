import { Box, Typography } from "@mui/material";
import React from "react";

interface IContentDescription {
  title: string;
  description: string;
}

export default function ContentDescription({
  title,
  description,
}: IContentDescription) {
  return (
    <Box sx={{ margin: 1, width: "100%" }}>
      <Typography variant="inherit" component="span">
        <Typography
          variant="inherit"
          component="span"
          sx={{ fontWeight: "bold" }}
        >
          {title}: &nbsp;
        </Typography>
        {description}
      </Typography>
    </Box>
  );
}
