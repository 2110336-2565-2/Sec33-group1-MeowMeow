import {
  Box,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import React from "react";
interface IStatisticsProps {
  accept: number;
  total: number;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "2vh",
  width: "100%",
  borderRadius: "1vh",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#F46D21",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1976D2",
  },
}));
export default function Statistics({ accept, total }: IStatisticsProps) {
  return (
    <Grid container direction="column" rowSpacing={1}>
      <Grid item>
        <Box fontFamily="Inter" fontWeight={600} fontSize={{ xs: 18, sm: 20 }}>
          {"Statistics"}
        </Box>
      </Grid>
      <Grid item justifyContent="center">
        <BorderLinearProgress
          variant="determinate"
          value={(accept / total) * 100}
        />
      </Grid>
      <Grid item justifyContent="center">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          fontSize={{ xs: 12, sm: 16 }}
          fontFamily="inter"
          fontWeight={400}
        >
          <Grid item xs="auto">
            {accept} Tour Accepted
          </Grid>
          {accept < total && (
            <Grid item xs="auto">
              {total - accept} Tour Rejected
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
