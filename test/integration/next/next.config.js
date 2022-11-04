const withTM = require('next-transpile-modules')(['@codegouvfr/react-dsfr']);

module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {

    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource"
    });

    return config;
  }
});
