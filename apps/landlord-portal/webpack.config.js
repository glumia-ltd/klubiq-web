/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  // ...other webpack config
  plugins: [
    // This plugin generates `service-worker.js` and the necessary assets for caching
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            },
          },
        },
        {
          urlPattern: new RegExp('/api/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 Week
            },
          },
        },
      ],
    }),
  ],
};
