"use client";

import React, { useState, useEffect, useRef } from "react";

interface FitResult {
  score: number;
  verdict: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  interviewTips: string[];
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const textColor =
    score >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 40
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";
  const strokeColor =
    score >= 70 ? "stroke-emerald-500" : score >= 40 ? "stroke-amber-500" : "stroke-rose-500";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${strokeColor} transition-all duration-1000`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-3xl font-bold ${textColor}`}>{score}</span>
      </div>
    </div>
  );
}

const card = "rounded-xl border p-5 bg-white border-gray-200 shadow-sm dark:bg-gray-800/50 dark:border-gray-700";
const bodyListItem = "text-sm flex gap-2 text-gray-700 dark:text-gray-300";

export default function FitAssessment() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<FitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAssess = async () => {
    if (jobDescription.trim().length < 50) {
      setError("Please paste a full job description (at least 50 characters).");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/fit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Assessment failed");
      }

      const data: FitResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="fit-check"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 w-full bg-[#FAFAF9] dark:bg-[#0B1220]"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        <div
          className={`text-center mb-10 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-green-700 dark:text-green-400">
            Fit Check
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin mb-4 pb-2 border-b w-fit mx-auto text-gray-900 border-gray-200 dark:text-white dark:border-gray-700">
            Would Luis be a good fit?
          </h2>
          <p className="text-base sm:text-lg max-w-lg mx-auto text-gray-600 dark:text-gray-400">
            Paste a job description and get an honest AI assessment of how
            Luis&apos;s experience maps to the role.
          </p>
        </div>

        <div
          className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 delay-150 bg-white border-gray-200 shadow-sm dark:bg-gray-800/50 dark:border-gray-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description here..."
            rows={4}
            className="w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-green-700 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-green-500"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-gray-400 dark:text-gray-600">
              {jobDescription.length} characters
            </span>
            <button
              onClick={handleAssess}
              disabled={loading || jobDescription.trim().length < 50}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-700 hover:bg-green-800 text-white dark:bg-green-500 dark:hover:bg-green-400 dark:text-gray-900"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Check Fit"
              )}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border p-6 text-center bg-white border-gray-200 shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
              <ScoreRing score={result.score} />
              <p className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                {result.verdict}
              </p>
              <p className="mt-2 text-sm max-w-md mx-auto text-gray-600 dark:text-gray-400">
                {result.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-5 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                <h4 className="text-sm font-semibold mb-3 text-emerald-700 dark:text-emerald-400">
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className={bodyListItem}>
                      <span className="text-emerald-500 shrink-0">&#10003;</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border p-5 bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20">
                <h4 className="text-sm font-semibold mb-3 text-rose-700 dark:text-rose-400">
                  Gaps
                </h4>
                <ul className="space-y-2">
                  {result.gaps.map((g, i) => (
                    <li key={i} className={bodyListItem}>
                      <span className="text-rose-500 shrink-0">&#8226;</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={card}>
              <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Recommendation
              </h4>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {result.recommendation}
              </p>
            </div>

            {result.interviewTips.length > 0 && (
              <div className="rounded-xl border p-5 bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 text-green-700 dark:text-green-400">
                  Interview Tips
                </h4>
                <ul className="space-y-2">
                  {result.interviewTips.map((tip, i) => (
                    <li key={i} className={bodyListItem}>
                      <span className="text-green-700 dark:text-green-400">&#9733;</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
