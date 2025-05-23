

/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';


const manifestForPlugin: Partial<VitePWAOptions> = {
	workbox: {
		maximumFileSizeToCacheInBytes: 25 * 1024 * 1024, // 5MB
	},
	registerType: 'prompt',
	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
	manifest: {
		name: 'Klubiq',
		short_name: 'Klubiq Tenant Portal',
		description: 'Property Management SAAS App for Tenants',
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
	},
};

export default ({ mode }: { mode: any }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// https://vitejs.dev/config/
	return defineConfig({
		plugins: [react(), VitePWA(manifestForPlugin)],
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
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      // commonjsOptions: {
      //   include: [/@klubiq\/ui-components/, /node_modules/],
      // },
    },
    optimizeDeps: {
      include: ['@klubiq/ui-components'],
    },
  
	});
};
