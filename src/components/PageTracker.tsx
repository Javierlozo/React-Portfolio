"use client";

import { useEffect } from "react";

function getVisitorId(): string {
  const key = "_vid";
  let id = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`))?.[1];
  if (!id) {
    id = crypto.randomUUID();
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${id}; expires=${expires}; path=/; SameSite=Lax`;
  }
  return id;
}

function sendBeacon(data: Record<string, unknown>) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  navigator.sendBeacon("/api/track", blob);
}

export default function PageTracker() {
  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

    const visitorId = getVisitorId();
    const params = new URLSearchParams(window.location.search);
    const startTime = Date.now();

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        screen_width: window.innerWidth,
        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,
        visitor_id: visitorId,
        language: navigator.language || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        event_type: "page_view",
      }),
    }).catch(() => {});

    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      if (duration > 0) {
        sendBeacon({
          event_type: "session_end",
          visitor_id: visitorId,
          path: window.location.pathname,
          session_duration: duration,
        });
      }
    };

    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleUnload();
    });

    return () => {
      window.removeEventListener("visibilitychange", handleUnload);
    };
  }, []);

  return null;
}

export function trackEvent(eventType: "click" | "download", path: string, label?: string) {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

  const visitorId = document.cookie.match(/(?:^|; )_vid=([^;]*)/)?.[1] || "unknown";
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: eventType,
      visitor_id: visitorId,
      path: label ? `${path}#${label}` : path,
    }),
  }).catch(() => {});
}
