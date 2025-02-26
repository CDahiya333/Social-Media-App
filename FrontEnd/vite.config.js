import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',  // Ensures Vite looks in the right place for index.html
  build: {
    outDir: 'dist', // Ensures build output goes to "dist"
  },
});
