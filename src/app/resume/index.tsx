"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Link from "next/link";

export default function ResumePage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 ${
        theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1
            className={`text-2xl sm:text-3xl font-thin ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Resume
          </h1>
          <a
            href="/resume/Resume.pdf"
            download
            className={`inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium border transition-all duration-300 shrink-0 ${
              theme === "dark"
                ? "border-gray-600 text-gray-300 hover:border-white hover:text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
            }`}
          >
            Download PDF
          </a>
        </div>
        <div
          className={`rounded-xl overflow-hidden border-2 ${
            theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"
          }`}
          style={{ minHeight: "calc(100vh - 12rem)" }}
        >
          <iframe
            src="/resume/Resume.pdf"
            title="Luis Lozoya Resume"
            className="w-full border-0"
            style={{ height: "calc(100vh - 12rem)", minHeight: "600px" }}
          />
        </div>
        <p
          className={`mt-4 text-center text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          <Link href="/" className="underline hover:no-underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
