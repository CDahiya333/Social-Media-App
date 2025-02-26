import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Remove tailwindcss() because it's not a Vite plugin
});
