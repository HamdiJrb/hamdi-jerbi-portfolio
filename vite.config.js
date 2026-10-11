import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/hamdi-jerbi-portfolio/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
