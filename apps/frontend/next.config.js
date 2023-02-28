const config = require("config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  env: {
    backendBaseURL: config.frontendConfig.BACKEND_BASE_URL,
  },
};

module.exports = nextConfig;
