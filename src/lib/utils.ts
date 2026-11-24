import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  if (typeof window === "undefined") {
    return `/api/${cleanEndpoint}`;
  }

  // Vite dev server (port 5173+) — proxy handles /api/ forwarding
  const port = parseInt(window.location.port, 10);
  if (port >= 5173 && port <= 5200) {
    return `/api/${cleanEndpoint}`;
  }

  const path = window.location.pathname;

  // Apache subfolder: /Vikram Yoga/emerald-serenity-hub[/dist]/...
  const m = path.match(/^(\/(?:Vikram(?:%20| )Yoga|yoga)\/emerald-serenity-hub)/i);
  if (m) return `${m[1]}/api/${cleanEndpoint}`;

  if (path.includes("/emerald-serenity-hub")) {
    const base = path.split("/emerald-serenity-hub")[0] + "/emerald-serenity-hub";
    return `${base}/api/${cleanEndpoint}`;
  }

  return `/api/${cleanEndpoint}`;
}

/**
 * Resolves a DB-stored image path to a browser-loadable URL.
 *
 * The DB stores paths in two forms:
 *   - /uploads/services/file.jpg   (admin-uploaded files)
 *   - /gallery/retreat.jpg         (seeded static gallery images)
 *
 * Environment mapping:
 *
 *  ┌─────────────────────────┬──────────────────────────────────────────┐
 *  │ Environment             │ Result for /uploads/services/file.jpg   │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Vite dev (port 5173+)   │ /uploads/services/file.jpg              │
 *  │                         │ (Vite serves /public at root)           │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Apache subfolder (XAMPP)│ /Vikram Yoga/emerald-serenity-hub/      │
 *  │                         │   public/uploads/services/file.jpg      │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Live production / root  │ /uploads/services/file.jpg              │
 *  │ (Hostinger public_html) │ (web root IS the deployed folder)       │
 *  └─────────────────────────┴──────────────────────────────────────────┘
 *
 * Absolute URLs (http/https/data/blob) and Vite-bundled /assets/ pass through.
 */
export function resolveImageUrl(src: string): string {
  if (!src) return "";

  // Already absolute or special scheme — return unchanged
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  // Vite-bundled assets (paths from the build pipeline) — pass through
  if (src.includes("/assets/")) {
    return src;
  }

  let cleanSrc = src.startsWith("/") ? src : `/${src}`;

  // ── Normalise legacy path prefixes ──────────────────────────────────────
  // Strip /public/ prefix that can appear when paths were accidentally saved
  // with a leading /public/ segment (e.g. /public/uploads/... or /public/gallery/...)
  if (cleanSrc.startsWith("/public/uploads/")) {
    cleanSrc = cleanSrc.replace("/public/uploads/", "/uploads/");
  } else if (cleanSrc.startsWith("/public/gallery/")) {
    cleanSrc = cleanSrc.replace("/public/gallery/", "/gallery/");
  } else if (cleanSrc.startsWith("/public/")) {
    // Generic /public/* → remove /public prefix
    cleanSrc = cleanSrc.replace("/public/", "/");
  }

  // ── Vite dev server ──────────────────────────────────────────────────────
  // Vite serves everything from /public at root, so /uploads/... and /gallery/...
  // work directly. Port 5173 is the default; 5174–5200 are overflow ports.
  if (typeof window !== "undefined") {
    const port = parseInt(window.location.port, 10);
    if (port >= 5173 && port <= 5200) {
      return cleanSrc;
    }
  }

  // ── Local Apache subfolder (XAMPP) ───────────────────────────────────────
  // When served via Apache at /Vikram Yoga/emerald-serenity-hub/...
  if (typeof window !== "undefined") {
    const path = window.location.pathname;

    // Exact match for local XAMPP subfolder: /Vikram Yoga/emerald-serenity-hub
    const m = path.match(/^(\/(?:Vikram(?:%20| )Yoga|yoga)\/emerald-serenity-hub)/i);
    if (m) {
      return `${m[1]}/public${cleanSrc}`;
    }

    // Generic subfolder containing emerald-serenity-hub (e.g. /dist/ subfolder)
    if (path.includes("/emerald-serenity-hub")) {
      const base = path.split("/emerald-serenity-hub")[0] + "/emerald-serenity-hub";
      return `${base}/public${cleanSrc}`;
    }
  }

  // ── Live Production at root domain (Hostinger public_html) ───────────────
  // The web root maps directly to public_html.
  // /uploads/... and /gallery/... are served directly from there.
  return cleanSrc;
}

/**
 * Appends a timestamp query param to bust browser/CDN caches.
 * Use for API fetch calls where stale data must never be returned.
 */
export function bustCache(url: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}_t=${Date.now()}`;
}
