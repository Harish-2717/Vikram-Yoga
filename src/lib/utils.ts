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

  // Vite dev server (port 5173) — proxy handles /api/ forwarding
  if (window.location.port === "5173") {
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
 * Resolves a root-relative /uploads/... path to a browser-loadable URL.
 *
 * The DB stores paths like "/uploads/services/svc-acupuncture-123.jpg".
 * The physical file lives at <project_root>/public/uploads/services/...
 *
 * Environment mapping:
 *
 *  ┌─────────────────────────┬──────────────────────────────────────────┐
 *  │ Environment             │ URL for /uploads/services/file.jpg      │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Vite dev (port 5173)    │ /uploads/services/file.jpg              │
 *  │                         │ (Vite serves /public at root)           │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Apache subfolder        │ /Vikram Yoga/emerald-serenity-hub       │
 *  │ (XAMPP)                 │   /public/uploads/services/file.jpg     │
 *  ├─────────────────────────┼──────────────────────────────────────────┤
 *  │ Production at root      │ /public/uploads/services/file.jpg       │
 *  │ (Hostinger, etc.)       │ (project root = web root)               │
 *  └─────────────────────────┴──────────────────────────────────────────┘
 *
 * Absolute URLs (http/https/data/blob) and Vite-bundled assets (/assets/) pass through.
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

  // Vite-bundled assets (paths containing /assets/ from the build pipeline) — pass through
  if (src.includes("/assets/")) {
    return src;
  }

  let cleanSrc = src.startsWith("/") ? src : `/${src}`;

  // Strip accidental legacy /public prefix if present (e.g. /public/uploads/... -> /uploads/...)
  if (cleanSrc.startsWith("/public/uploads/")) {
    cleanSrc = cleanSrc.replace("/public/uploads/", "/uploads/");
  } else if (cleanSrc.startsWith("/public/gallery/")) {
    cleanSrc = cleanSrc.replace("/public/gallery/", "/gallery/");
  }

  // ── Vite dev server ──
  // Vite serves everything from /public at root, so /uploads/... works directly
  if (typeof window !== "undefined" && window.location.port === "5173") {
    return cleanSrc;
  }

  // ── Local Apache subfolder (XAMPP): /Vikram Yoga/emerald-serenity-hub/... ──
  if (typeof window !== "undefined") {
    const path = window.location.pathname;

    // Apache subfolder: /Vikram Yoga/emerald-serenity-hub/...
    const m = path.match(/^(\/(?:Vikram(?:%20| )Yoga|yoga)\/emerald-serenity-hub)/i);
    if (m) {
      return `${m[1]}/public${cleanSrc}`;
    }

    // Generic subfolder with emerald-serenity-hub
    if (path.includes("/emerald-serenity-hub")) {
      const base = path.split("/emerald-serenity-hub")[0] + "/emerald-serenity-hub";
      return `${base}/public${cleanSrc}`;
    }
  }

  // ── Live Production at root domain (Hostinger public_html, cPanel, custom domain) ──
  // The web root maps directly to public_html, and uploads live in /uploads/...
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
