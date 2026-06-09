import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { handleApiRequest } from "./src/lib/api";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "api-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url || !req.url.startsWith("/api")) {
            return next();
          }
          handleApiRequest(req, res)
            .then((handled) => {
              if (!handled) {
                next();
              }
            })
            .catch(next);
        });
      },
    },
  ],
  build: {
    outDir: "dist",
  },
});
