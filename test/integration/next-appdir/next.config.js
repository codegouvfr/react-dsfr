/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  webpack: config => {

    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });

    return config;
  }
};

module.exports = nextConfig;
