/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
