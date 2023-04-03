import dashboardUrlMapper from "@/utils/dashboardUrlMapper";
import { useContext, useMemo, useState } from "react";
import { AVAILABLE_DASHBOARD_STATE } from "./types/dashBoardState";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

const useDashBoard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const isGuide = useMemo(() => {
    if (!user || !user.roles) {
      return false;
    }
    return !!user.roles.includes("GUIDE");
  }, [user]);
  const [selectTab, setSelectTab] = useState<
    AVAILABLE_DASHBOARD_STATE | undefined
  >(dashboardUrlMapper(router.asPath, isGuide));

  const onChange = (
    _: React.SyntheticEvent,
    newValue: AVAILABLE_DASHBOARD_STATE
  ) => {
    setSelectTab(newValue);
  };

  return { selectTab, onChange };
};

export default useDashBoard;
