import {
  AVAILABLE_DASHBOARD_STATE,
  DASHBOARD_STATE_GUIDE,
  DASHBOARD_STATE_USER,
} from "@/hooks/types/dashBoardState";

const pathToDashboardMapper = Object.values({
  ...DASHBOARD_STATE_USER,
  ...DASHBOARD_STATE_GUIDE,
}).reduce((prev, curr) => {
  const { name, path } = curr;
  return { ...prev, [path]: name };
}, {} as { [key: string]: AVAILABLE_DASHBOARD_STATE });

const dashboardUrlMapper = (url: string) => {
  return pathToDashboardMapper[url];
};

export default dashboardUrlMapper;