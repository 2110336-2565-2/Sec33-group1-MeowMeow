import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useDashBoard from "@/hooks/useDashBoard";
import AuthProvider from "@/context/AuthContext";
import StateLists from "./StateLists";
import { Roles_Types } from "@/context/type/authContext";
import Link from "next/link";

interface IDashBoardProps {
  children?: ReactNode;
  roleAllowed?: Roles_Types[];
}

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const DashBoard = ({ children, roleAllowed = ["USER"] }: IDashBoardProps) => {
  return (
    <AuthProvider roleAllowed={roleAllowed}>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={4}
        padding="48px 0px"
      >
        <Stack
          direction="column"
          spacing={3}
          sx={{
            border: "2px solid #F0F2F4",
            minWidth: "300px",
            paddingX: "16px",
            paddingY: "24px",
            position: "sticky",
            top: "48px",
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing="12px"
              width="100%"
              justifyContent="center"
            >
              <Image
                src="/images/loginPage/guideKai-logo.svg"
                alt="guideKai"
                width={32}
                height={32}
              />
              <Typography variant="h6" fontWeight="700" sx={{ color: "black" }}>
                GuideKai
              </Typography>
            </Stack>
          </Link>
          <Divider color="#E0E0E0" />
          <StateLists />
        </Stack>
        <Stack sx={{ width: "100%" }}>{children}</Stack>
      </Stack>
    </AuthProvider>
  );
};

export default DashBoard;
