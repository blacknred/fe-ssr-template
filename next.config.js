/** @type {import('next').NextConfig} */
/** @type {import('next-pwa').PWAConfig} */
const withPWA = require('next-pwa');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // serverActions: true,
    // instrumentationHook: true,
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

if (process.env.NODE_ENV === 'production') {
  //   config.output = "standalone"; // 'export'

  config.webpack = (config) => {
    const entry = generateAppDirEntry(config.entry);
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, 'register.js');

    entry().then((entries) => {
      // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
      if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
        if (Array.isArray(entries['main-app'])) {
          entries['main-app'].unshift(registerJs);
        } else if (typeof entries['main-app'] === 'string') {
          entries['main-app'] = [registerJs, entries['main-app']];
        }
      }

      config.entry = () => entries;
      return config;
    });
  };
  //   (config.webpack = function (config, { dev, ...other }) {
  //     if (!dev) {
  //       // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
  //       config.resolve.alias["@formatjs/icu-messageformat-parser"] =
  //         "@formatjs/icu-messageformat-parser/no-parser";
  //     }
  //     return config;
  //   }),
  //     // react-intl
  //     (config.i18n = {
  //       locales: ["en", "ru"], // /docs, /ru/docs
  //       defaultLocale: "en",
  //       domains: [
  //         // example.com/docs example.ru/docs
  //         {
  //           domain: "example.com",
  //           defaultLocale: "en-US",
  //         },
  //         {
  //           domain: "example.ru",
  //           defaultLocale: "ru-RU",
  //           // test locale domains locally with http instead of https
  //           http: true,
  //         },
  //       ],
  //     });

  config = withPWA(config)({
    dest: 'public',
    register: true,
    // https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
    buildExcludes: ['app-build-manifest.json'],
  });
}

module.exports = nextConfig;
