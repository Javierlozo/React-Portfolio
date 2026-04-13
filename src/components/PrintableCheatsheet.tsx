"use client";

import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export interface CheatRow {
  command: string;
  purpose: string;
  flags: string;
  labSlug: string;
  labTitle: string;
}

export interface CheatSection {
  name: string;
  rows: CheatRow[];
}

export default function PrintableCheatsheet({
  sections,
  total,
}: {
  sections: CheatSection[];
  total: number;
}) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const filtered = q
    ? sections
        .map((s) => ({
          ...s,
          rows: s.rows.filter(
            (r) =>
              r.command.toLowerCase().includes(q) ||
              r.purpose.toLowerCase().includes(q) ||
              r.flags.toLowerCase().includes(q) ||
              r.labTitle.toLowerCase().includes(q) ||
              s.name.toLowerCase().includes(q)
          ),
        }))
        .filter((s) => s.rows.length > 0)
    : sections;

  const filteredTotal = q ? filtered.reduce((n, s) => n + s.rows.length, 0) : total;

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, footer, .no-print { display: none !important; }
          .cheat-root { padding: 0.2in !important; max-width: 100% !important; }
          .cheat-root, .cheat-root * { color: black !important; background: transparent !important; }
          .cheat-section { break-inside: avoid-page; margin-bottom: 10pt; }
          .cheat-section h2 {
            font-size: 12pt !important;
            font-weight: 700;
            border-bottom: 1.5pt solid black;
            padding-bottom: 2pt;
            margin: 6pt 0 3pt 0;
          }
          .cheat-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
          .cheat-table th {
            font-size: 7.5pt !important;
            font-weight: 700;
            text-align: left;
            border-bottom: 1pt solid black !important;
            padding: 2pt 4pt !important;
          }
          .cheat-table td {
            padding: 1.5pt 4pt !important;
            border-bottom: 0.4pt solid #bbb !important;
            vertical-align: top;
          }
          .cheat-table tr { page-break-inside: avoid; }
          .cheat-cmd { font-family: "Courier New", monospace; font-weight: 600; white-space: pre-wrap; width: 38%; }
          .cheat-purpose { width: 26%; }
          .cheat-flags { font-family: "Courier New", monospace; font-size: 8pt !important; white-space: pre-wrap; width: 36%; }
          .cheat-page-break { break-before: page; }
          @page { margin: 0.35in; size: landscape; }
        }
      `}</style>

      <div className={`cheat-root min-h-screen pt-24 pb-8 px-4 sm:px-6 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-4 no-print">
            <div>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                GSEC CyberLive Cheatsheet
              </h1>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {filteredTotal} commands across {filtered.length} tool groups. Print landscape, 8.5pt. Drill each section until automatic.
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
              Print Cheatsheet
            </button>
          </div>

          <div className="mb-6 no-print">
            <input
              type="text"
              placeholder="Search command, flag, purpose..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full max-w-sm px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500/50"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-amber-400"
              }`}
            />
          </div>

          {filtered.map((section) => (
            <section key={section.name} className="cheat-section mb-8">
              <h2 className={`text-lg font-bold mb-2 pb-1 border-b ${theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-300"}`}>
                {section.name} <span className={`font-normal text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>({section.rows.length})</span>
              </h2>
              <table className="cheat-table w-full text-sm border-collapse">
                <thead>
                  <tr className={`text-left text-xs uppercase tracking-wider ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                    <th className="cheat-cmd py-1.5 px-2">Command</th>
                    <th className="cheat-purpose py-1.5 px-2">Purpose</th>
                    <th className="cheat-flags py-1.5 px-2">Key flags</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr
                      key={`${section.name}-${i}`}
                      className={`border-b ${theme === "dark" ? "border-gray-800/50" : "border-gray-100"}`}
                    >
                      <td className={`cheat-cmd py-1.5 px-2 font-mono text-xs whitespace-pre-wrap ${theme === "dark" ? "text-amber-300" : "text-amber-800"}`}>
                        {row.command}
                      </td>
                      <td className={`cheat-purpose py-1.5 px-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {row.purpose}
                        {row.labTitle && (
                          <div className={`text-[10px] mt-0.5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                            {row.labTitle}
                          </div>
                        )}
                      </td>
                      <td className={`cheat-flags py-1.5 px-2 font-mono text-[11px] whitespace-pre-wrap ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {row.flags || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}

          <p className={`text-center text-xs mt-8 no-print ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
            Tip: if you can&apos;t recall what a flag does without looking, drill that tool. CyberLive is timed — muscle memory wins over recall.
          </p>
        </div>
      </div>
    </>
  );
}
