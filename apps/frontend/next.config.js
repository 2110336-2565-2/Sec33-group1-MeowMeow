require("dotenv").config({ path: "../../.env" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  env: {
    backendBaseURL: process.env.BACKEND_BASE_URL,
  },
};

module.exports = nextConfig;
