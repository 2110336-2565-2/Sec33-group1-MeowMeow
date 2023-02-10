import {
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
interface IStarAndBarProps {
  star: number;
  count: number;
  total: number;
}
export default function StarAndBar({ star, count, total }: IStarAndBarProps) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "0.75vh",
    borderRadius: "1vh",
    [theme.breakpoints.up("xs")]: {
      width: "55vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40vw",
    },
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D4D5D6",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#475569",
    },
  }));

  return (
    <Grid
      container
      item
      direction="row"
      justifyContent={{ xs: "center", sm: "right" }}
      alignItems="center"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          sx={{
            visibility: 4 - i >= star ? "hidden" : "visible",
            fontSize: { xs: 12, md: 16 },
            opacity: 0.35,
          }}
        />
      ))}
      <BorderLinearProgress
        variant="determinate"
        value={(count / total) * 100}
      />
    </Grid>
  );
}
