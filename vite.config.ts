import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    open: true,
    host: true,
  },
  plugins: [react()],
});