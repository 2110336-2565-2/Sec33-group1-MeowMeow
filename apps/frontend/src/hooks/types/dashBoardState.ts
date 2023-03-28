export const DASHBOARD_STATES = {
  CREATE_POST: "CREATE_POST",
  VIEW_POST: "VIEW_POST",
  VIEW_USER_PROFILE: "VIEW_USER_PROFILE",
  SHOW_TOURS: "SHOW_TOURS",
  SHOW_CONFIRMATION: "SHOW_CONFIRMATION",
} as const;

export type DASHBOARD_STATES_TYPES = keyof typeof DASHBOARD_STATES;