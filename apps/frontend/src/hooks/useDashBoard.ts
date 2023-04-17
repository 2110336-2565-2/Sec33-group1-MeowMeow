import dashboardUrlMapper from "@/utils/dashboardUrlMapper";
import { useContext, useEffect, useMemo, useState } from "react";
import { AVAILABLE_DASHBOARD_STATE } from "./types/dashBoardState";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { Roles } from "@/components/Dashboard/StateLists";

const useDashBoard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const role: Roles = useMemo(() => {
    if (user?.roles?.includes("GUIDE")) {
      return Roles.GUIDE;
    }
    if (user?.roles?.includes("ADMIN")) {
      return Roles.ADMIN;
    }
    return Roles.USER;
  }, [user]);
  const [selectTab, setSelectTab] = useState<
    AVAILABLE_DASHBOARD_STATE | undefined
  >(undefined);

  useEffect(() => {
    setSelectTab(dashboardUrlMapper(router.asPath, role));
  }, [role]);

  const onChange = (
    _: React.SyntheticEvent,
    newValue: AVAILABLE_DASHBOARD_STATE
  ) => {
    setSelectTab(newValue);
  };

  return { selectTab, role, onChange };
};

export default useDashBoard;
