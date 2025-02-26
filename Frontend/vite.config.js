import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',  // Ensures Vite looks in the right place for index.html
  build: {
    outDir: 'dist', // Ensures build output goes to "dist"
  },
  server: {
    port:5000,
    proxy: {
      '/api': { // Adjust this path to match your backend API route
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});