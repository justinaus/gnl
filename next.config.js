/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
};

module.exports = nextConfig;
