import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import StyledTab from "./StyledTab";
import useDashBoard from "@/hooks/useDashBoard";
import { DASHBOARD_STATES } from "@/hooks/types/dashBoardState";
import AuthProvider from "@/context/AuthContext";

interface IDashBoardProps {
  children?: ReactNode;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const DashBoard = ({ children }: IDashBoardProps) => {
  const { selectTab, onChange } = useDashBoard();
  return (
    <AuthProvider>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={4}
        paddingTop="48px"
      >
        <Stack
          direction="column"
          spacing={3}
          sx={{
            border: "2px solid blue",
            minWidth: "300px",
            paddingX: "16px",
            paddingY: "24px",
            position: "sticky",
            top: "48px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="12px"
            width="100%"
          >
            <Image
              src="/images/loginPage/guideKai-logo.svg"
              alt="guideKai"
              width={32}
              height={32}
            />
            <Typography variant="h6" fontWeight="700">
              GuideKai
            </Typography>
          </Stack>
          <Divider color="#E0E0E0" />
          <Tabs
            orientation="vertical"
            aria-label="basic tabs example"
            onChange={onChange}
            value={selectTab}
          >
            <StyledTab
              value={DASHBOARD_STATES.CREATE_POST}
              label="Create Post"
              {...a11yProps(0)}
            />
            <StyledTab
              value={DASHBOARD_STATES.VIEW_POST}
              label="View Posts"
              {...a11yProps(1)}
            />
            <StyledTab
              value={DASHBOARD_STATES.VIEW_USER_PROFILE}
              label="View User Profile"
              {...a11yProps(2)}
            />
            <StyledTab
              value={DASHBOARD_STATES.SHOW_TOURS}
              label="Show Tours"
              {...a11yProps(3)}
            />
            <StyledTab
              value={DASHBOARD_STATES.SHOW_CONFIRMATION}
              label="Show Confirmation"
              {...a11yProps(4)}
            />
          </Tabs>
        </Stack>
        {children}
      </Stack>
    </AuthProvider>
  );
};

export default DashBoard;
