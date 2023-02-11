import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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

interface IFeatureBoxProps {
  id: number;
  title: string;
  description: string;
  icon: ReactElement<OverridableComponent<SvgIconTypeMap<{}, "svg">>>;
  background: string;
  boxShadow: string;
}

export default function FeatureBox(props: IFeatureBoxProps) {
  return (
    <Item>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={4}>
          <Grid
            container
            sx={{ width: { sm: 128, xs: 100 }, height: 128 }}
            alignItems="center"
            justifyContent="center"
            margin={0}
          >
            <Grid
              container
              sx={{
                background: props.background,
                boxShadow: props.boxShadow,
                borderRadius: "16px",
                width: { xs: "66px", sm: "66px" },
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
