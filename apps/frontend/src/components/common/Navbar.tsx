import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar
      position="static"
      elevation={4}
      style={{ background: "#FFFF" }}
      sx={{ padding: { xs: 0 } }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Image
            src="/images/loginPage/guideKai-logo.svg"
            alt="guideKai logo"
            width={45}
            height={45}
            style={{ marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            component="a"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}
            href="/"
          >
            GuideKai
          </Typography>
          <Button
            variant="outlined"
            style={{ margin: "10px" }}
            onClick={() => router.push("/")}
          >
            LOGIN
          </Button>
          <Button variant="contained" onClick={() => router.push("/register")}>
            SIGN UP
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
