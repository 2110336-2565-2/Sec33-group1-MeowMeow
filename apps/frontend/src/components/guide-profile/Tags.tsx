import { Box, Chip, Grid } from "@mui/material";
import { AppProps } from "next/app";
import React from "react";
interface ITagsProps {
  title: string;
  tags: Array<string>;
}
export default function Tags({ title, tags }: ITagsProps) {
  return (
    <Grid container direction="column" rowSpacing={1}>
      <Grid item>
        <Box fontSize={{ xs: 20, sm: 24 }} fontWeight={600}>
          {title}
        </Box>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={1} wrap="wrap">
          {tags.map((tag) => (
            <Grid item xs="auto">
              <Chip label={tag} size="small" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
