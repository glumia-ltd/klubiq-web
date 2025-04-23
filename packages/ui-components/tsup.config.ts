import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
    'react-hook-form',
    '@hookform/resolvers',
    'yup',
    '@zxcvbn-ts/core'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
    options.define = {
      'process.env.NODE_ENV': '"production"',
    }
    options.jsx = 'automatic'
  },
  minify: true,
  outDir: 'dist',
  onSuccess: 'npm run types',
}) 