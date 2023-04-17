import { Roles } from "@/components/Dashboard/StateLists";
import {
  ADMIN_STATE_LIST,
  AVAILABLE_DASHBOARD_STATE,
  DASHBOARD_STATE_ADMIN,
  DASHBOARD_STATE_GUIDE,
  DASHBOARD_STATE_USER,
  GUIDE_STATE_LIST,
} from "@/hooks/types/dashBoardState";

const pathToDashboardMapper = Object.values({
  ...DASHBOARD_STATE_USER,
  ...DASHBOARD_STATE_GUIDE,
  ...DASHBOARD_STATE_ADMIN,
}).reduce((prev, curr) => {
  const { name, path } = curr;
  return { ...prev, [path]: name };
}, {} as { [key: string]: AVAILABLE_DASHBOARD_STATE });

const dashboardUrlMapper = (url: string, roles: Roles[]) => {
  if (roles.includes(Roles.GUIDE) && roles.includes(Roles.ADMIN)) {
    return pathToDashboardMapper[url.split("?")[0]];
  }
  if (
    roles.includes(Roles.GUIDE) &&
    !!GUIDE_STATE_LIST.find((data) => data === url)
  ) {
    return undefined;
  }
  if (
    roles.includes(Roles.ADMIN) &&
    !!ADMIN_STATE_LIST.find((data) => data === url)
  ) {
    return undefined;
  }
  return pathToDashboardMapper[url.split("?")[0]];
};

export default dashboardUrlMapper;
