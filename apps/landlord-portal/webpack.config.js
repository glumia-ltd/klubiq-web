/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { GenerateSW } = require('workbox-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
	// ...other webpack config
	plugins: [
		new webpack.DefinePlugin({
			'process.env.REACT_APP_DATA_CACHE': JSON.stringify(
				process.env.REACT_APP_DATA_CACHE,
			),
			'process.env.REACT_APP_ALLOWED_ORIGINS': JSON.stringify(
				process.env.REACT_APP_ALLOWED_ORIGINS,
			),
			'process.env.REACT_APP_PUBLIC_CACHED_PATHS': JSON.stringify(
				process.env.REACT_APP_PUBLIC_CACHED_PATHS,
			),
			'process.env.REACT_APP_CACHE_EXPIRATION_TIME': JSON.stringify(
				process.env.REACT_APP_CACHE_EXPIRATION_TIME,
			),
		}),
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
