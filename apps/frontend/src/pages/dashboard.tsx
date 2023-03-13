import DashBoard from "@/components/Dashboard/DashBoard";

import { Stack, Typography } from "@mui/material";

const DashboardPage = () => {
  return (
    <DashBoard>
      <Stack sx={{ minHeight: "2500px" }}>
        <Typography>Welcome to dashboard home page.</Typography>
      </Stack>
    </DashBoard>
  );
};

export default DashboardPage;
