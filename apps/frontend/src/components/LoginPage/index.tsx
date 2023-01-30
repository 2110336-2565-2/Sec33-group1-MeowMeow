import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      rowGap={3}
      sx={{
        maxWidth: "100%",
        height: "100vh",
        border: "2px solid black",
        background:
          "linear-gradient(90deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)",
      }}
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained">
        <Typography variant="body1" color="white">
          REGISTER
        </Typography>
      </Button>
    </Box>
  );
};

export default LoginPage;
