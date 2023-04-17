import dashboardUrlMapper from "@/utils/dashboardUrlMapper";
import { useContext, useEffect, useMemo, useState } from "react";
import { AVAILABLE_DASHBOARD_STATE } from "./types/dashBoardState";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { Roles } from "@/components/Dashboard/StateLists";

const useDashBoard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const roles: Roles[] = useMemo(() => {
    const supportRoles = [];
    if (user?.roles?.includes("GUIDE")) {
      supportRoles.push(Roles.GUIDE);
    }
    if (user?.roles?.includes("ADMIN")) {
      supportRoles.push(Roles.ADMIN);
    }
    if (user?.roles?.includes("USER")) {
      supportRoles.push(Roles.USER);
    }
    return supportRoles;
  }, [user]);
  const [selectTab, setSelectTab] = useState<
    AVAILABLE_DASHBOARD_STATE | undefined
  >(undefined);

  useEffect(() => {
    roles.length > 0 && setSelectTab(dashboardUrlMapper(router.asPath, roles));
  }, [roles]);

  const onChange = (
    _: React.SyntheticEvent,
    newValue: AVAILABLE_DASHBOARD_STATE
  ) => {
    setSelectTab(newValue);
  };

  return { selectTab, roles, onChange };
};

export default useDashBoard;
