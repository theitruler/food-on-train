/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloud.appwrite.io'],
  },
    env: {
      TRAIN_API_URL: process.env.TRAIN_API_URL,
    },
  }
  
  module.exports = nextConfig