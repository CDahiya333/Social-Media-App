import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Make sure Vite looks in the root folder
  build: {
    outDir: "dist", // Ensure it outputs to `dist` folder
  },
});
