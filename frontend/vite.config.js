import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  })],
  server: {
    proxy: {
      '/api': {
        target: 'https://masterpiece-lsvl.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxInject: '',
  },
  base: './', // 👈 critical for correct asset paths
});
