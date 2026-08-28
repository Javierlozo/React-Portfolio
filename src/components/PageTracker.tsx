"use client";

import { useEffect } from "react";

/**
 * An id for this page load, and nothing longer.
 *
 * This used to be a `_vid` cookie holding a UUID with a **one year expiry**,
 * set on first paint with no consent, and stored server side next to the
 * visitor's IP address. That is a persistent identifier: it linked every visit
 * you ever made into one trail.
 *
 * It bought repeat-visitor counts, which nothing here was reading, and it cost
 * an unconsented tracking cookie under ePrivacy plus the whole of GDPR's
 * definition of monitoring. On an application security portfolio, a reader who
 * opens the inspector and finds a year-long UUID has learned something about
 * the author, and it is not the intended thing.
 *
 * What is left is generated in memory, lives until the tab navigates away, and
 * is never written to the browser. It exists only so the `session_end` beacon
 * can find the row its own page view wrote a moment earlier. Two page views
 * cannot be joined by it, and two visits certainly cannot.
 */
function newPageLoadId(): string {
  return crypto.randomUUID();
}

function sendBeacon(data: Record<string, unknown>) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  navigator.sendBeacon("/api/track", blob);
}

export default function PageTracker() {
  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

    const visitorId = newPageLoadId();
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

    const sendSessionEnd = () => {
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

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendSessionEnd();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}

export function trackEvent(eventType: "click" | "download", path: string, label?: string) {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

  // No visitor id. This read the `_vid` cookie, which no longer exists; a
  // click is a count of a thing happening on a path, and attributing it to a
  // person was the part that had to go. Anything joining clicks to page views
  // would rebuild the identifier this change removed.
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: eventType,
      path: label ? `${path}#${label}` : path,
    }),
  }).catch(() => {});
}
