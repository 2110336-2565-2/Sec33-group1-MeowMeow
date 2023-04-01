import { AuthContext } from "@/context/AuthContext";
import {
  DASHBOARD_STATE_GUIDE,
  DASHBOARD_STATE_USER,
} from "@/hooks/types/dashBoardState";
import { useContext, useMemo } from "react";
import { a11yProps } from "./DashBoard";

import useDashBoard from "@/hooks/useDashBoard";
import StyledTab from "./StyledTab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";

const StateLists = () => {
  const { onChange, selectTab } = useDashBoard();
  const { user } = useContext(AuthContext);
  const isGuide = useMemo(() => {
    if (!user || !user.roles) {
      return false;
    }
    return !!user.roles.includes("GUIDE");
  }, [user]);
  const router = useRouter();

  return (
    <Tabs
      orientation="vertical"
      aria-label="basic tabs example"
      onChange={onChange}
      value={selectTab || false}
    >
      {Object.values(DASHBOARD_STATE_USER).map((state, index) => {
        const { name, path } = state;
        return (
          <StyledTab
            key={name}
            sx={{ width: "100%" }}
            label={name}
            value={name}
            onClick={async () => {
              await router.push(path);
            }}
            {...a11yProps(index)}
          />
        );
      })}
      {isGuide &&
        Object.values(DASHBOARD_STATE_GUIDE).map((state, index) => {
          const { name, path } = state;
          return (
            <StyledTab
              key={name}
              sx={{ width: "100%" }}
              label={name}
              value={name}
              onClick={async () => {
                await router.push(path);
              }}
              {...a11yProps(index)}
            />
          );
        })}
    </Tabs>
  );
};

export default StateLists;
