"use client";

import { useEffect } from "react";

export default function PageTracker() {
  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

    const params = new URLSearchParams(window.location.search);

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
      }),
    }).catch(() => {});
  }, []);

  return null;
}
