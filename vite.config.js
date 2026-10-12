import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base so the build works at both hamdijerbi.me and the github.io project path
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
