import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginLeft: "20px",
  marginRight: "20px",
  borderRadius: "16px",
}));

let styleMapping = new Map<number, string[]>();
styleMapping.set(1, [
  "linear-gradient(154.49deg, #5CA1FE 6.61%, #217BF4 89.72%)",
  "0px 10px 22px -2px #6DABFF5C",
]);
styleMapping.set(2, [
  "linear-gradient(154.49deg, #FF858A 6.61%, #F04148 89.72%)",
  "0px 8px 22px -2px #F8575E4D",
]);
styleMapping.set(3, [
  "linear-gradient(154.49deg, #FFD085 6.61%, #FFAF2E 89.72%)",
  "0px 10px 22px -2px #FABA544D",
]);
styleMapping.set(4, [
  "linear-gradient(154.49deg, #5CA1FE 6.61%, #217BF4 89.72%)",
  "0px 10px 22px -2px #6DABFF5C",
]);

interface featureBoxProps {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export default function FeatureBox(props: featureBoxProps) {
  return (
    <Item>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}>
          <Grid
            container
            sx={{ width: 128, height: 128 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              sx={{
                background: styleMapping.get(props.id)![0],
                boxShadow: styleMapping.get(props.id)![1],
                borderRadius: "16px",
                width: "66px",
                height: "66px",
              }}
              alignItems="center"
              justifyContent="center"
            >
              {props.icon}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                style={{ fontSize: "24px", fontWeight: "600" }}
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" gutterBottom>
                {props.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
}
