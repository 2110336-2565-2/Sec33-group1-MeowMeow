/* eslint turbo/no-undeclared-env-vars: 0 */

export type FrontendConfig = {
  BACKEND_BASE_URL: string;
  FRONTEND_BASE_URL: string;
  NEXT_PUBLIC_ABC: string;
  FRONTEND_OMISE_PUBLIC_KEY: string;
};

export const loadFrontendConfig = (): FrontendConfig => {
  if (!process.env.FRONTEND_OMISE_PUBLIC_KEY) {
    throw new Error("FRONTEND_OMISE_PUBLIC_KEY is not set");
  }
  return {
    FRONTEND_OMISE_PUBLIC_KEY: process.env.FRONTEND_OMISE_PUBLIC_KEY,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || "http://localhost:8080/",
    FRONTEND_BASE_URL:
      process.env.FRONTEND_BASE_URL || "http://localhost:3000/",
    NEXT_PUBLIC_ABC: process.env.NEXT_PUBLIC_ABC || "no env",
  };
};
