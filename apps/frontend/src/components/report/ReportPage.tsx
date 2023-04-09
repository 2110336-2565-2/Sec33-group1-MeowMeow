import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReportForm from "./ReportForm";
const ReportPage = () => {
  return (
    <Stack direction="column" width="100%" alignItems="center">
      <Typography
        margin="16px 0px"
        fontSize={{ lg: 24, xs: 20 }}
        textAlign="center"
        sx={{ fontWeight: "600" }}
      >
        Report Guide / Trips
      </Typography>
      <ReportForm />
    </Stack>
  );
};

export default ReportPage;
