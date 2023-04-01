export const DASHBOARD_STATES = {
  CREATE_POST: "CREATE_POST",
  VIEW_POST: "VIEW_POST",
  VIEW_USER_PROFILE: "VIEW_USER_PROFILE",
  SHOW_TOURS: "SHOW_TOURS",
  SHOW_CONFIRMATION: "SHOW_CONFIRMATION",
} as const;

export const DASHBOARD_STATE_USER = {
  GUIDE_REGISTER: {
    name: "GUIDE_REGISTER",
    path: "/guide-register",
  },
  PROFILE: {
    name: "PROFILE",
    path: "/profile",
  },
  SEARCH: {
    name: "SEARCH",
    path: "/search",
  },
  TRAVELLER_RECORD: {
    name: "TRAVELLER_RECORD",
    path: "/traveller-record",
  },
} as const;

export const DASHBOARD_STATE_GUIDE = {
  CREATE_POST: {
    name: "CREATE_POST",
    path: "/guide-post/create",
  },
  GUIDE_POST: {
    name: "GUIDE_POST",
    path: "/guide-post",
  },
  MANAGE_TRIP_GUIDE: {
    name: "MANAGE_TRIP_GUIDE",
    path: "/managetrip-guide",
  },
} as const;

export type DASHBOARD_STATE_USER_TYPE = keyof typeof DASHBOARD_STATE_USER;
export type DASHBOARD_STATE_GUIDE_TYPE = keyof typeof DASHBOARD_STATE_GUIDE;

export type AVAILABLE_DASHBOARD_STATE =
  | DASHBOARD_STATE_USER_TYPE
  | DASHBOARD_STATE_GUIDE_TYPE;
