/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });
    return config;
  },
  //This option requires Next 13.1 or newer, if you can't update you can use this plugin instead: https://github.com/martpie/next-transpile-modules
  transpilePackages: ["@codegouvfr/react-dsfr", "tss-react"]
};

module.exports = nextConfig