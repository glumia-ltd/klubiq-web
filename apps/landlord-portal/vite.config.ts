/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'process';
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

console.log('this is env', env.VITE_APIKEY);
console.log('this is env', loadEnv);

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Klubiq",
    short_name: "Klubiq",
    description: "Property mangement SAAS App",
    icons: [
      {
        src: "/ios-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/ios-180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#002147",
    background_color: "#fffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), VitePWA(manifestForPlugin)],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BASE_URL_DEV,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
