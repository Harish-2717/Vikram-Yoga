import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl(endpoint: string): string {
  if (typeof window === "undefined") {
    return `/api/${endpoint}`;
  }
  const path = window.location.pathname;
  let base = "";
  if (path.includes("/yoga/emerald-serenity-hub/dist")) {
    base = "/yoga/emerald-serenity-hub/dist";
  } else if (path.includes("/yoga/emerald-serenity-hub")) {
    base = "/yoga/emerald-serenity-hub";
  }
  return `${base}/api/${endpoint}`;
}

