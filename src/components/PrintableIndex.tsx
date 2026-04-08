"use client";

import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
interface IndexEntry {
  ref: string;
  term: string;
  answer: string;
}

export default function PrintableIndex({ entries }: { entries: IndexEntry[] }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const filtered = search
    ? entries.filter(
        (e) =>
          e.term.toLowerCase().includes(search.toLowerCase()) ||
          e.answer.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  // Group by first letter
  const grouped = filtered.reduce<Record<string, IndexEntry[]>>((acc, entry) => {
    const first = entry.term[0]?.toUpperCase() ?? "#";
    const letter = /[A-Z]/.test(first) ? first : "#";
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort((a, b) => {
    if (a === "#") return -1;
    if (b === "#") return 1;
    return a.localeCompare(b);
  });

  const allLetters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, footer, .no-print { display: none !important; }
          .print-index { padding: 0.25in !important; max-width: 100% !important; }
          .print-index, .print-index * { color: black !important; background: transparent !important; }
          .print-index table { font-size: 9pt !important; page-break-inside: auto; border-collapse: collapse; width: 100%; }
          .print-index th { font-size: 8pt !important; font-weight: bold; border-bottom: 1.5pt solid black !important; padding: 2pt 4pt !important; }
          .print-index td { padding: 1.5pt 4pt !important; border-bottom: 0.5pt solid #ccc !important; vertical-align: top; }
          .print-index tr { page-break-inside: avoid; }
          .print-index .letter-row td { font-weight: bold !important; font-size: 11pt !important; padding-top: 6pt !important; border-bottom: 1pt solid black !important; }
          .print-index .ref-col { width: 12%; border-bottom: 1pt dotted #999 !important; }
          .print-index .term-col { width: 25%; font-weight: 600; }
          .print-index .answer-col { width: 63%; }
          @page { margin: 0.4in; size: landscape; }
        }
      `}</style>

      <div className={`print-index min-h-screen pt-24 pb-8 px-4 sm:px-6 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 no-print">
            <div>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                GSEC Exam Index
              </h1>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {filtered.length} entries | Fill in Book.Page as you study | Print landscape, 9pt, spiral bind
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
              }`}
            >
              Print Index
            </button>
          </div>

          {/* Search */}
          <div className="mb-4 no-print">
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full max-w-sm px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500/50"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-amber-400"
              }`}
            />
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-1 mb-6 no-print">
            {allLetters.map((letter) => {
              const hasEntries = !!grouped[letter];
              return (
                <a
                  key={letter}
                  href={hasEntries ? `#letter-${letter}` : undefined}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                    hasEntries
                      ? theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : theme === "dark"
                        ? "bg-gray-900 text-gray-700 cursor-default"
                        : "bg-gray-50 text-gray-300 cursor-default"
                  }`}
                >
                  {letter}
                </a>
              );
            })}
          </div>

          {/* Index table */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`text-left text-xs uppercase tracking-wider ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                <th className={`ref-col py-1.5 px-2 border-b-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                  Book.Page
                </th>
                <th className={`term-col py-1.5 px-2 border-b-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                  Term
                </th>
                <th className={`answer-col py-1.5 px-2 border-b-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                  Answer
                </th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <React.Fragment key={letter}>
                  {/* Letter divider row */}
                  <tr id={`letter-${letter}`} className="letter-row">
                    <td
                      colSpan={3}
                      className={`pt-4 pb-1 px-2 text-lg font-bold border-b ${
                        theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-300"
                      }`}
                    >
                      {letter}
                    </td>
                  </tr>
                  {grouped[letter].map((entry, i) => (
                    <tr
                      key={`${letter}-${i}`}
                      className={`border-b ${theme === "dark" ? "border-gray-800/50" : "border-gray-100"}`}
                    >
                      <td className={`ref-col py-1.5 px-2 font-mono text-xs border-b border-dashed ${
                        theme === "dark" ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"
                      }`}>
                        {entry.ref || ""}
                      </td>
                      <td className={`term-col py-1.5 px-2 font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {entry.term}
                      </td>
                      <td className={`answer-col py-1.5 px-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {entry.answer}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <p className={`text-center text-xs mt-8 no-print ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
            Tip: Add duplicate entries under different keywords for the same concept (e.g., &quot;XSS&quot; and &quot;Cross-site scripting&quot;).
            After practice exams, add terms you couldn&apos;t find quickly.
          </p>
        </div>
      </div>
    </>
  );
}
