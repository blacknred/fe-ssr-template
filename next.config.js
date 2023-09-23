/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  // env: {
  //   API_HOST: process.env.API_HOST,
  // },
};

if (process.env.NODE_ENV === "production") {
  config.output = "standalone"; // 'export'

  config.pwa = {
    dest: "public",
    register: true,
    skipWaiting: true,
  };

  (config.webpack = function (config, { dev, ...other }) {
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias["@formatjs/icu-messageformat-parser"] =
        "@formatjs/icu-messageformat-parser/no-parser";
    }
    return config;
  }),
    // react-intl
    (config.i18n = {
      locales: ["en", "ru"], // /docs, /ru/docs
      defaultLocale: "en",
      domains: [
        // example.com/docs example.ru/docs
        {
          domain: "example.com",
          defaultLocale: "en-US",
        },
        {
          domain: "example.ru",
          defaultLocale: "ru-RU",
          // test locale domains locally with http instead of https
          http: true,
        },
      ],
    });

  config = withPWA(config);
}

module.exports = nextConfig;
