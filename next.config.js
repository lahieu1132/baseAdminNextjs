const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./global";`,
  },
  webpack(config) {
    // From https://nanxiaobei.medium.com/disable-css-modules-in-next-js-project-756835172b6e
    // remove css module
    // Find and remove NextJS css rules.
    // for next@12, try `config.module.rules[2]...`
    // console.log(config.module.rules[2].oneOf)
    if (config.module.rules[2].oneOf) {
      config.module.rules[2].oneOf.forEach((one) => {
        if (!`${one.issuer ? one.issuer.and : "undefined"}`.includes("_app"))
          return;
        one.issuer.and = [path.resolve(__dirname)];
      });
    }

    return config;
  },
};
