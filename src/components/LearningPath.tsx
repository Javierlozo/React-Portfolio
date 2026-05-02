"use client";

import React, { useEffect, useState } from "react";
import { learningPath, type LearningItem } from "@/src/data/learningPath";

function formatLastUpdated(iso: string): string {
  const date = new Date(iso + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function isStale(iso: string, staleAfterDays: number): boolean {
  const updated = new Date(iso + "T00:00:00Z").getTime();
  const now = Date.now();
  const days = (now - updated) / (1000 * 60 * 60 * 24);
  return days > staleAfterDays;
}

export default function LearningPath() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const visible = mounted || prefersReducedMotion;
  const dur = prefersReducedMotion ? "duration-0" : "duration-500";
  const stale = isStale(learningPath.lastUpdated, learningPath.staleAfterDays);

  const earned = learningPath.current.filter((i) => i.status === "done");
  const inProgress = learningPath.current.filter((i) => i.status === "in-progress");

  return (
    <section
      id="learning-path"
      aria-label="Learning in flight"
      className="px-4 sm:px-6 md:px-8"
    >
      <div
        className={`max-w-4xl mx-auto border-y border-gray-200 dark:border-gray-800 py-6 sm:py-8 transition-all ease-out ${dur} ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
          <h2 className="text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
            Learning in flight
          </h2>
          <span className="text-[10px] sm:text-xs font-light text-gray-400 dark:text-gray-500">
            {stale ? (
              <span className="text-amber-600 dark:text-amber-400">
                · Updated {formatLastUpdated(learningPath.lastUpdated)} (stale)
              </span>
            ) : (
              <>· Updated {formatLastUpdated(learningPath.lastUpdated)}</>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-x-4 gap-y-3 sm:gap-y-2.5 items-baseline">
          <RowLabel>Earned</RowLabel>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {earned.map((item) => (
              <li key={item.id}>
                <Pill item={item} reducedMotion={prefersReducedMotion} />
              </li>
            ))}
          </ul>

          <RowLabel>In progress</RowLabel>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {inProgress.map((item) => (
              <li key={item.id}>
                <Pill item={item} reducedMotion={prefersReducedMotion} />
              </li>
            ))}
          </ul>

          <RowLabel>Up next</RowLabel>
          <p className="text-xs sm:text-sm font-light text-gray-500 dark:text-gray-400">
            {learningPath.upcoming.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] sm:text-xs font-light tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">
      {children}
    </span>
  );
}

function Pill({
  item,
  reducedMotion,
}: {
  item: LearningItem;
  reducedMotion: boolean;
}) {
  const isDone = item.status === "done";
  const dotClass = isDone
    ? "bg-gray-900 dark:bg-white"
    : `bg-amber-500 dark:bg-amber-400 ${reducedMotion ? "" : "animate-pulse"}`;

  return (
    <span
      title={item.meta}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-light text-gray-700 dark:text-gray-300"
    >
      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{item.label}</span>
      {item.progress && (
        <span className="text-gray-500 dark:text-gray-400 tabular-nums">
          {item.progress.current}/{item.progress.total}
        </span>
      )}
    </span>
  );
}
