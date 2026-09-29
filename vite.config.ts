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
        target: "http://localhost/Vikram%20Yoga/emerald-serenity-hub",
        changeOrigin: true,
        bypass(req) {
          // Never proxy requests that look like frontend routes
          const url = req.url ?? "";
          if (!url.startsWith("/api/")) return url;
        },
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
