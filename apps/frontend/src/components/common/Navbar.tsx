import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import theme from "@/config/theme";
import { Container } from "@mui/material";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
      <AppBar position="static" elevation={4} style={{ background: "#FFFF" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: theme.palette.primary["main"] }}
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
            <Button variant="outlined" style={{ margin: "10px" }}>
              LOGIN
            </Button>
            <Button variant="contained">SIGN UP</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
