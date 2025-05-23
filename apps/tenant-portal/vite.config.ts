import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/@klubiq\/ui-components/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ['@klubiq/ui-components'],
  },
}) 