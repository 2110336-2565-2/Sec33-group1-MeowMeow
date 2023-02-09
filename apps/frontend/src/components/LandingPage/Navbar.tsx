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
            {/* <Box
                component="img"
                sx={{
                height: 30,
                width: 30,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            /> */}
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
