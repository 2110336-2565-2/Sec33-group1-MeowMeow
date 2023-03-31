import dashboardUrlMapper from "@/utils/dashboardUrlMapper";
import { useState } from "react";
import { AVAILABLE_DASHBOARD_STATE } from "./types/dashBoardState";
import { useRouter } from "next/router";

const useDashBoard = () => {
  const router = useRouter();
  const [selectTab, setSelectTab] = useState<AVAILABLE_DASHBOARD_STATE>(
    dashboardUrlMapper(router.asPath)
  );

  const onChange = (
    _: React.SyntheticEvent,
    newValue: AVAILABLE_DASHBOARD_STATE
  ) => {
    setSelectTab(newValue);
  };

  return { selectTab, onChange };
};

export default useDashBoard;
