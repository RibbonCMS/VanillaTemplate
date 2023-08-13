/** @type {import('next').NextConfig} */
const { basePath } = require('./lib/consts')

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
}

module.exports = nextConfig
