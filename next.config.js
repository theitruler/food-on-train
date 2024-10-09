/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['cloud.appwrite.io'],
  },
    env: {
      TRAIN_API_URL: process.env.TRAIN_API_URL,
    },
  }
  
  module.exports = nextConfig