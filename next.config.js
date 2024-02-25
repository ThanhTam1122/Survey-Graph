/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
    reactRemoveProperties: true,
  },
  transpilePackages: ['ky'],
};

module.exports = nextConfig;
