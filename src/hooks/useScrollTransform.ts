"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollTransformOptions {
  /** 0 = top of viewport when element enters, 1 = bottom of viewport when element leaves */
  startOffset?: number;
  endOffset?: number;
}

/**
 * Returns a ref and a progress value (0-1) based on how far the element
 * has scrolled through the viewport. Use this for Apple-style scroll-linked
 * transforms: parallax, scale, opacity, etc.
 */
export function useScrollTransform(options: ScrollTransformOptions = {}) {
  const { startOffset = 0, endOffset = 1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Element's position relative to viewport
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate progress: 0 when element enters viewport, 1 when it leaves
    const totalTravel = windowHeight + elementHeight;
    const traveled = windowHeight - elementTop;
    const raw = traveled / totalTravel;

    // Map to startOffset..endOffset range
    const mapped = (raw - startOffset) / (endOffset - startOffset);
    const clamped = Math.max(0, Math.min(1, mapped));

    setProgress(clamped);
    ticking.current = false;
  }, [startOffset, endOffset]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial calculation
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return { ref, progress };
}
