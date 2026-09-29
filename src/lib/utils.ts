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

  // When running on Vite dev server (port 5173 or other dev port with proxy)
  if (window.location.port && window.location.port === "5173") {
    return `/api/${cleanEndpoint}`;
  }

  const path = window.location.pathname;

  // Check if hosted under an Apache subfolder (e.g., /Vikram Yoga/..., /Vikram%20Yoga/..., /yoga/...)
  const match = path.match(/^(\/(?:Vikram%20Yoga|Vikram Yoga|yoga)\/emerald-serenity-hub(?:\/dist)?)/i);
  if (match) {
    const base = match[1].replace(/\/dist$/i, "");
    return `${base}/api/${cleanEndpoint}`;
  }

  // Fallback for any subdirectory ending with emerald-serenity-hub
  if (path.includes("/emerald-serenity-hub")) {
    const parts = path.split("/emerald-serenity-hub");
    return `${parts[0]}/emerald-serenity-hub/api/${cleanEndpoint}`;
  }

  return `/api/${cleanEndpoint}`;
}

export function resolveImageUrl(src: string): string {
  if (!src) return "";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  // On Vite dev server (port 5173), root-relative paths like /uploads/... are served from /public
  if (typeof window !== "undefined" && window.location.port === "5173") {
    return src;
  }

  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const cleanSrc = src.startsWith("/") ? src : `/${src}`;

    // Under Apache subfolder
    const match = path.match(/^(\/(?:Vikram%20Yoga|Vikram Yoga|yoga)\/emerald-serenity-hub(?:\/dist)?)/i);
    if (match) {
      const isDist = /\/dist(\/|$)/i.test(path);
      const base = match[1].replace(/\/dist$/i, "");
      return isDist ? `${base}/dist${cleanSrc}` : `${base}/public${cleanSrc}`;
    }

    if (path.includes("/emerald-serenity-hub")) {
      const parts = path.split("/emerald-serenity-hub");
      const isDist = /\/dist(\/|$)/i.test(path);
      const base = `${parts[0]}/emerald-serenity-hub`;
      return isDist ? `${base}/dist${cleanSrc}` : `${base}/public${cleanSrc}`;
    }
  }

  return src;
}

