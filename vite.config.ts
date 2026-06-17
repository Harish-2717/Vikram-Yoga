import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/vikram-yoga/emerald-serenity-hub",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
