// Lightweight analytics event tracking helper (GA4 + Self-Hosted Umami)
export type AnalyticsEventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }

    // 2. Umami Self-Hosted Analytics
    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(eventName, params ?? undefined);
    }
  } catch {
    // Non-blocking fallback
  }
}
