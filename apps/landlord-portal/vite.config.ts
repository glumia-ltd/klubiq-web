/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
// import { visualizer } from 'rollup-plugin-visualizer';

const manifestForPlugin: Partial<VitePWAOptions> = {
	strategies: 'injectManifest',
	srcDir: 'src',
	filename: 'service-worker.ts',
	registerType: 'autoUpdate',
	injectRegister: 'auto',
	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
	injectManifest:{
		maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 5MB
	},
	manifest: {
		name: 'Klubiq',
		short_name: 'Klubiq',
		description: 'Property Management SAAS App',
		icons: [
			{
				src: '/ios-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'monochrome',
			},
			{
				src: '/android-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/ios-180.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'apple touch icon',
			},
			{
				src: '/icon.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
		theme_color: '#002147',
		background_color: '#FFFFFF',
		display: 'standalone',
		scope: '/',
		start_url: '/',
		orientation: 'portrait',
		display_override: ['window-controls-overlay'],
		edge_side_panel: {
			preferred_width: 400
		},
		launch_handler: {
			client_mode: ['auto', 'focus-existing']
		},
		prefer_related_applications: false,
		related_applications: [],
		shortcuts: [],
		screenshots: [],
		lang: 'en',
		dir: 'ltr',
	},
	workbox: {
		globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
		cleanupOutdatedCaches: true,
		sourcemap: true,
		maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 5MB
		clientsClaim: true,
		skipWaiting: true,
		disableDevLogs: true,
		navigateFallback: '/index.html',
		navigateFallbackAllowlist: [/^(?!\/__).*/],
		navigateFallbackDenylist: [/\.(?:png|jpg|jpeg|svg|gif)$/],
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
				urlPattern: /^https:\/\/stagingapi\.klubiq\.com\/api\/.*/i,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'staging-api-cache',
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
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
					},
					matchOptions: {
						ignoreVary: true,
					},
				},
			},
			{
				urlPattern: /\.(?:js|css)$/,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-resources',
					matchOptions: {
						ignoreVary: true,
					},
				},
			},
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'google-fonts',
					expiration: {
						maxEntries: 20,
						maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
					},
					matchOptions: {
						ignoreVary: true,
					},
				},
			},
			{
				urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'google-fonts',
					expiration: {
						maxEntries: 20,
						maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
					},
					matchOptions: {
						ignoreVary: true,
					},
				},
			},
		],
	},
	devOptions: {
		enabled: true,
		type: 'module',
	},
};

export default ({ mode }: { mode: any }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	const getBaseURL = () => {
		switch (process.env.VITE_NODE_ENV) {
			case 'local':
				return process.env.VITE_BASE_URL_LOCAL;
			case 'development':
				return process.env.VITE_BASE_URL_DEV;
			case 'staging':
				return process.env.VITE_BASE_URL_STAGING;
			case 'production':
				return process.env.VITE_BASE_URL_PROD;
			default:
				return process.env.VITE_BASE_URL_LOCAL;
		}
	};
	// https://vitejs.dev/config/
	return defineConfig({
		plugins: [
			react(),
			VitePWA({
				...manifestForPlugin,
				devOptions: {
					enabled: true,
					type: 'module',
					navigateFallback: 'index.html',
				},
				includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
				// manifest: {
				// 	...manifestForPlugin.manifest,
				// 	start_url: '/',
				// 	scope: '/',
				// 	display: 'standalone',
				// 	orientation: 'portrait',
				// 	theme_color: '#002147',
				// 	background_color: '#FFFFFF',
				// 	icons: (manifestForPlugin.manifest as any)?.icons || [],
				// },
			}),
		],
		optimizeDeps: {
			include: [
				// '@klubiq/ui-components',
				'react',
				'react-dom',
				'material-ui',
				'@emotion/styled',
				'@emotion/react',
				'@mui/material/Tooltip',
				'@mui/material/Unstable_Grid2',
			],
			exclude: ['node_modules/.cache'],
		},
		build: {
			outDir: 'dist',
			sourcemap: mode === 'local' || mode === 'test',
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: mode === 'development' || mode === 'staging' || mode === 'production',
					drop_debugger: mode === 'development' || mode === 'staging' || mode === 'production',
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
		css: {
			devSourcemap: true,
		},
		server: {
			port: 5173,
			host: true,
			strictPort: false,
			allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
			open: true,
			hmr: {
				protocol: 'ws',
				host: 'localhost',
				port: 5173,
				clientPort: 5173,
				timeout: 5000,
			},
			proxy: {
				'/api': {
					target: getBaseURL(),
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
			warmup: {
				clientFiles: ['./src/helpers/*.ts', './src/helpers/countries-meta.json', './src/helpers/utils.tsx'],
			},
		},
	});
};
