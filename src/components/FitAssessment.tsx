"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface FitResult {
  score: number;
  verdict: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  interviewTips: string[];
}

function ScoreRing({ score, isDark }: { score: number; isDark: boolean }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70
      ? isDark ? "text-emerald-400" : "text-emerald-600"
      : score >= 40
        ? isDark ? "text-amber-400" : "text-amber-600"
        : isDark ? "text-rose-400" : "text-rose-600";
  const strokeColor =
    score >= 70
      ? "stroke-emerald-500"
      : score >= 40
        ? "stroke-amber-500"
        : "stroke-rose-500";

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
          className={isDark ? "text-gray-700" : "text-gray-200"}
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
        <span className={`text-3xl font-bold ${color}`}>{score}</span>
      </div>
    </div>
  );
}

export default function FitAssessment() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
      className={`py-12 sm:py-16 md:py-20 w-full ${isDark ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        <div
          className={`text-center mb-10 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            Fit Check
          </p>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-4 pb-2 border-b w-fit mx-auto ${
              isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Would Luis be a good fit?
          </h2>
          <p
            className={`text-base sm:text-lg max-w-lg mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Paste a job description and get an honest AI assessment of how
            Luis&apos;s experience maps to the role.
          </p>
        </div>

        <div
          className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 delay-150 ${
            isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description here..."
            rows={4}
            className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent ${
              isDark
                ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:ring-cyan-500"
                : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
            }`}
          />
          <div className="flex items-center justify-between mt-3">
            <span
              className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              {jobDescription.length} characters
            </span>
            <button
              onClick={handleAssess}
              disabled={loading || jobDescription.trim().length < 50}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white ${
                isDark
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Check Fit"
              )}
            </button>
          </div>

          {error && <p className={`mt-3 text-sm ${isDark ? "text-rose-400" : "text-rose-600"}`}>{error}</p>}
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Score + Verdict */}
            <div
              className={`rounded-2xl border p-6 text-center ${
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <ScoreRing score={result.score} isDark={isDark} />
              <p
                className={`mt-3 text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {result.verdict}
              </p>
              <p
                className={`mt-2 text-sm max-w-md mx-auto ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {result.summary}
              </p>
            </div>

            {/* Strengths + Gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <h4
                  className={`text-sm font-semibold mb-3 ${
                    isDark ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li
                      key={i}
                      className={`text-sm flex gap-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span className="text-emerald-500 shrink-0">&#10003;</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? "bg-rose-500/10 border-rose-500/20"
                    : "bg-rose-50 border-rose-200"
                }`}
              >
                <h4
                  className={`text-sm font-semibold mb-3 ${
                    isDark ? "text-rose-400" : "text-rose-700"
                  }`}
                >
                  Gaps
                </h4>
                <ul className="space-y-2">
                  {result.gaps.map((g, i) => (
                    <li
                      key={i}
                      className={`text-sm flex gap-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span className="text-rose-500 shrink-0">&#8226;</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div
              className={`rounded-xl border p-5 ${
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <h4
                className={`text-sm font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Recommendation
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {result.recommendation}
              </p>
            </div>

            {/* Interview Tips */}
            {result.interviewTips.length > 0 && (
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? "bg-cyan-500/10 border-cyan-500/20"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h4
                  className={`text-sm font-semibold mb-3 ${
                    isDark ? "text-cyan-400" : "text-blue-700"
                  }`}
                >
                  Interview Tips
                </h4>
                <ul className="space-y-2">
                  {result.interviewTips.map((tip, i) => (
                    <li
                      key={i}
                      className={`text-sm flex gap-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span className={isDark ? "text-cyan-400" : "text-blue-500"}>&#9733;</span>
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
