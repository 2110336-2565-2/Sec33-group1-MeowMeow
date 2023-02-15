import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { Typography, useTheme } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const LoginUtils = () => {
  const theme = useTheme();
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingX="4px"
    >
      <Stack direction="row" alignItems="center">
        <Checkbox
          {...label}
          defaultChecked
          sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
        />
        <Typography variant="body2" color={theme.palette.text.secondary}>
          Remember me
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoginUtils;
