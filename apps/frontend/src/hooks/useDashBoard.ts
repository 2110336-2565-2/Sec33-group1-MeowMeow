import { useState } from "react";
import {
  DASHBOARD_STATES,
  DASHBOARD_STATES_TYPES,
} from "./types/dashBoardState";

const useDashBoard = () => {
  const [selectTab, setSelectTab] = useState<DASHBOARD_STATES_TYPES>(
    DASHBOARD_STATES.CREATE_POST
  );

  const onChange = (
    _: React.SyntheticEvent,
    newValue: DASHBOARD_STATES_TYPES
  ) => {
    console.log("pass-this2");
    setSelectTab(newValue);
  };

  return { selectTab, onChange };
};

export default useDashBoard;
