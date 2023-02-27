/* eslint turbo/no-undeclared-env-vars: 0 */

export type FrontendConfig = {
  BACKEND_BASE_URL: string;
  FRONTEND_BASE_URL: string;
};

export const loadFrontendConfig = (): FrontendConfig => ({
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || "http://localhost:8080/",
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || "http://localhost:3000/",
});
