"use client";

import React, { useRef, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (!contentRef.current || busy) return;
    setBusy(true);
    try {
      const mod = await import("html2pdf.js");
      const html2pdf = ((mod as { default?: unknown }).default || mod) as () => {
        from: (el: HTMLElement) => { set: (opts: Record<string, unknown>) => { save: () => Promise<void> } };
      };
      await html2pdf()
        .from(contentRef.current)
        .set({
          margin: [0.35, 0.35, 0.35, 0.35],
          filename: "sec401-cheatsheet.pdf",
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
          pagebreak: { mode: ["css", "legacy"], avoid: ".cheat-section" },
        })
        .save();
    } finally {
      setBusy(false);
    }
  };

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

      <div className="cheat-root min-h-screen pt-24 pb-8 px-4 sm:px-6 bg-[#FAFAF9] dark:bg-[#0B1220]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-4 no-print">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                GSEC CyberLive Cheatsheet
              </h1>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                {filteredTotal} commands across {filtered.length} tool groups. Print landscape, 8.5pt. Drill each section until automatic.
              </p>
            </div>
            <button
              onClick={downloadPdf}
              disabled={busy}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-wait bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30"
            >
              {busy ? "Generating PDF…" : "Download PDF"}
            </button>
          </div>

          <div className="mb-6 no-print">
            <input
              type="text"
              placeholder="Search command, flag, purpose..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm px-3 py-2 rounded-lg text-sm border outline-none transition-colors bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500/50"
            />
          </div>

          <div ref={contentRef}>
          {filtered.map((section) => (
            <section key={section.name} className="cheat-section mb-8">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b text-amber-700 border-gray-300 dark:text-amber-400 dark:border-gray-700">
                {section.name} <span className="font-normal text-sm text-gray-400 dark:text-gray-500">({section.rows.length})</span>
              </h2>
              <table className="cheat-table w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    <th className="cheat-cmd py-1.5 px-2">Command</th>
                    <th className="cheat-purpose py-1.5 px-2">Purpose</th>
                    <th className="cheat-flags py-1.5 px-2">Key flags</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr
                      key={`${section.name}-${i}`}
                      className="border-b border-gray-100 dark:border-gray-800/50"
                    >
                      <td className="cheat-cmd py-1.5 px-2 font-mono text-xs whitespace-pre-wrap text-amber-800 dark:text-amber-300">
                        {row.command}
                      </td>
                      <td className="cheat-purpose py-1.5 px-2 text-gray-700 dark:text-gray-300">
                        {row.purpose}
                        {row.labTitle && (
                          <div className="text-[10px] mt-0.5 text-gray-400 dark:text-gray-500">
                            {row.labTitle}
                          </div>
                        )}
                      </td>
                      <td className="cheat-flags py-1.5 px-2 font-mono text-[11px] whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                        {row.flags || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
          </div>

          <p className="text-center text-xs mt-8 no-print text-gray-400 dark:text-gray-600">
            Tip: if you can&apos;t recall what a flag does without looking, drill that tool. CyberLive is timed. Muscle memory wins over recall.
          </p>
        </div>
      </div>
    </>
  );
}
