require("dotenv-mono").load();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  env: {
    backendBaseURL: process.env.BACKEND_BASE_URL,
    FRONTEND_OMISE_PUBLIC_KEY: process.env.FRONTEND_OMISE_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
