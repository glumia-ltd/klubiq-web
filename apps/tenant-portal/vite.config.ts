/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'prompt',
			manifest: {
				name: 'Klubiq Tenant Portal',
				short_name: 'Klubiq',
				description: 'Property Management SAAS App for Tenants',
				theme_color: '#002147',
				background_color: '#FFFFFF',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait'
			},
			workbox: {
				cleanupOutdatedCaches: true,
				sourcemap: true,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.klubiq\.com\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 72 * 60 * 60, // 72 hours
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
							matchOptions: {
								ignoreVary: true,
							},
						},
					},
					{
						urlPattern: /^https:\/\/localhost:3000\/api\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'local-api-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 72 * 60 * 60,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
							matchOptions: {
								ignoreVary: true,
							},
						},
					},
					{
						urlPattern: /^https:\/\/devapi\.klubiq\.com\/api\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'dev-api-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 72 * 60 * 60,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
							matchOptions: {
								ignoreVary: true,
							},
						},
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
							}
						}
					}
				]
			},
			devOptions: {
				enabled: true,
				type: 'module'
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 3002,
		open: true,
		proxy: {
			'/api': {
				target: process.env.VITE_BASE_URL_DEV || 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
			},
		},
		hmr: {
			overlay: true,
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: process.env.NODE_ENV === 'development',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: process.env.NODE_ENV === 'production',
				drop_debugger: process.env.NODE_ENV === 'production',
			},
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					mui: ['@mui/material', '@mui/icons-material'],
				},
			},
		},
	},
	optimizeDeps: {
		include: ['@klubiq/ui-components'],
		exclude: ['@klubiq/ui-components/dist'],
	},
	css: {
		devSourcemap: true,
	},
});
