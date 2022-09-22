module.exports = {
  reactStrictMode: true,
  webpack: config => {

    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });

    return config;
  },
}
