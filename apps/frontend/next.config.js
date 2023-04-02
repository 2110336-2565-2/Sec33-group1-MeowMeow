require("dotenv-mono").load();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  env: {
    backendBaseURL: process.env.BACKEND_BASE_URL,
    BACKEND_OMISE_PUBLIC_KEY:
      process.env.BACKEND_OMISE_PUBLIC_KEY || "pkey_test_5v70hqdlwjvi70erf9n",
  },
};

module.exports = nextConfig;
