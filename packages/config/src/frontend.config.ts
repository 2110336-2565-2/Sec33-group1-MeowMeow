/* eslint turbo/no-undeclared-env-vars: 0 */

export type FrontendConfig = {
  BACKEND_BASE_URL: string;
};

export const loadFrontendConfig = (): FrontendConfig => ({
  BACKEND_BASE_URL:
    process.env.BACKEND_BASE_URL || "https://se2-api-dev.pongdev.dev",
});
