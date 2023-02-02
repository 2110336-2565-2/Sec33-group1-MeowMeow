import theme from "@/config/theme";
import {
  Typography,
  AppBar,
  Grid,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterBar() {
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        component="footer"
        color="default"
        style={{ marginTop: "20px", background: "#FFFF" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                  color: theme.palette.primary["main"],
                  paddingLeft: 10,
                }}
              >
                <CatchingPokemonIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
              >
                GuideKai
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                size="large"
                edge="start"
                color="default"
                aria-label="menu"
                sx={{
                  mr: 2,
                  color: theme.palette.primary["main"],
                  paddingRight: 10,
                }}
              >
                <FacebookIcon style={{ marginRight: "10", color: "#000000" }} />
                <GitHubIcon style={{ marginRight: "10", color: "#000000" }} />
                <InstagramIcon style={{ color: "#000000" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="caption">Copyright © 2022 GuideKai</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
