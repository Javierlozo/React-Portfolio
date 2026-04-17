"use client";
import { useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#_$%&@";

interface ScrambleTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  duration?: number;
  delay?: number;
}

export default function ScrambleText({
  children,
  as: Tag = "h2",
  className = "",
  duration = 900,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(children);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(children);
      return;
    }

    const target = children;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startAt = performance.now() + delay;
        const queue = target.split("").map((char, i) => ({
          char,
          from: Math.random() * duration * 0.4,
          to: (i / target.length) * duration * 0.7 + duration * 0.3,
        }));

        const step = (now: number) => {
          const t = now - startAt;
          if (t < 0) {
            rafRef.current = requestAnimationFrame(step);
            return;
          }
          let done = 0;
          const out = queue
            .map(({ char, from, to }) => {
              if (char === " " || char === "\u00A0") return char;
              if (t < from) return CHARSET[Math.floor(Math.random() * CHARSET.length)];
              if (t >= to) {
                done += 1;
                return char;
              }
              return CHARSET[Math.floor(Math.random() * CHARSET.length)];
            })
            .join("");
          setDisplay(out);
          if (done < queue.filter((q) => q.char !== " " && q.char !== "\u00A0").length) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            setDisplay(target);
          }
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [children, duration, delay]);

  return (
    <Tag ref={ref as any} className={className} aria-label={children}>
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
