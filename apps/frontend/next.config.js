require("dotenv").config({ path: "../../.env" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  env: {
    backendBaseURL: process.env.BACKEND_BASE_URL,
    BACKEND_OMISE_PUBLIC_KEY: process.env.BACKEND_OMISE_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
