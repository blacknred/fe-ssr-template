/** @type {import('next').NextConfig} */
/** @type {import('next-pwa').PWAConfig} */
const path = require('path');
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

let config = {
  reactStrictMode: true,
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
    instrumentationHook: true,
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
  headers() {
    return [
      {
        source: '/((?!_next|favicon.ico).*)',
        missing: [
          {
            type: 'header',
            key: 'Next-Router-Prefetch',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: [
              `s-maxage=` + 86400, // 1d in s
              `stale-while-revalidate=` + 31557600, // 1y in s
            ].join(', '),
          },
        ],
      },
    ];
  },
};

if (process.env.NODE_ENV === 'production') {
  //   config.output = "standalone"; // 'export'

  config.webpack = (conf) => {
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, 'register.js');

    conf.entry = () =>
      conf.entry().then((entries) => {
        // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
        if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
          if (Array.isArray(entries['main-app'])) {
            entries['main-app'].unshift(registerJs);
          } else if (typeof entries['main-app'] === 'string') {
            entries['main-app'] = [registerJs, entries['main-app']];
          }
        }

        return entries;
      });

    return conf;
  };

  const withPWA = require('next-pwa')({
    buildExcludes: ['app-build-manifest.json'],
    dest: 'public',
    register: true,
  });

  config = withPWA(config);
}

module.exports = withNextIntl(config);
