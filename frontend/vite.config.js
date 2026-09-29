import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  base: "/", // 🔑 important for router (Hoisting path correct )
});
