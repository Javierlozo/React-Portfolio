"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { CybersecurityLab } from "../data/labs";

interface Props {
  labs: CybersecurityLab[];
  heading: string;
  subheading?: string;
  filename?: string;
}

export default function LabPrintView({ labs, heading, subheading, filename }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadPdf = async () => {
    if (!contentRef.current || busy) return;
    setBusy(true);
    try {
      const mod = await import("html2pdf.js");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdf: any = (mod as any).default || mod;
      const safeName =
        filename ||
        (labs.length === 1
          ? `${labs[0].courseSlug}-${labs[0].slug}.pdf`
          : `${labs[0]?.courseSlug ?? "labs"}-binder.pdf`);
      await html2pdf()
        .from(contentRef.current)
        .set({
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: safeName,
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], before: ".lab-page-break", avoid: ".lab-section" },
        })
        .save();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <style>{`
        .lab-print { background: white; color: #000; padding: 6rem 1.25rem 2rem; max-width: 8.5in; margin: 0 auto; }
        .lab-print-inner { background: white; color: #000; padding: 0.25in; }
        .lab-print-inner pre { background: #f4f4f5; border: 1px solid #999; }
        .lab-print h1, .lab-print-inner h1 { font-size: 1.65rem !important; font-weight: 700 !important; margin: 0 0 0.25rem !important; color: #000 !important; }
        .lab-print h2, .lab-print-inner h2 { font-size: 1.2rem !important; font-weight: 700 !important; margin: 0.75rem 0 0.25rem !important; border-bottom: 2px solid #000 !important; padding-bottom: 2pt !important; color: #000 !important; }
        .lab-print h3, .lab-print-inner h3 { font-size: 1rem !important; font-weight: 700 !important; margin: 0.5rem 0 0.2rem !important; color: #000 !important; }
        .lab-print p, .lab-print-inner p { margin: 0.25rem 0; line-height: 1.35; color: #000 !important; }
        .lab-print pre, .lab-print-inner pre { padding: 6pt 8pt; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8.5pt; white-space: pre-wrap !important; word-break: break-all !important; overflow-wrap: anywhere !important; margin: 0.25rem 0; border-radius: 3pt; color: #000 !important; max-width: 100% !important; box-sizing: border-box; }
        .lab-print .breakdown, .lab-print-inner .breakdown { font-size: 9pt; margin: 0.2rem 0 0.4rem 0.75rem; padding-left: 0.5rem; border-left: 2px solid #000; white-space: pre-wrap !important; word-break: break-all !important; overflow-wrap: anywhere !important; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #000 !important; max-width: 100% !important; }
        .lab-print-inner { max-width: 100%; overflow: hidden; }
        .lab-print .meta { font-size: 9pt; color: #000; font-weight: 600; }
        .lab-step { margin: 0.6rem 0; }
        .lab-page-break { page-break-before: always; }
        .lab-section { page-break-inside: avoid; }
        .lab-title-block { page-break-after: avoid; }
      `}</style>

      <div className="lab-print">
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid #e4e4e7", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href={labs.length === 1 ? `/labs/${labs[0].courseSlug}/${labs[0].slug}` : "/labs"}
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#2563eb",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              ← Back to {labs.length === 1 ? "lab" : "labs"}
            </Link>
            <div>
              <div style={{ fontSize: "0.875rem", color: "#555" }}>{subheading}</div>
              <div style={{ fontWeight: 600, color: "#000" }}>{heading}</div>
            </div>
          </div>
          <button
            onClick={downloadPdf}
            disabled={busy}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "0.5rem",
              background: busy ? "#d97706" : "#f59e0b",
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 600,
              border: 0,
              cursor: busy ? "wait" : "pointer",
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? "Generating PDF…" : "Download PDF"}
          </button>
        </div>

        <div ref={contentRef} className="lab-print-inner">
          {labs.map((lab, labIdx) => (
            <article key={lab.id} className={labIdx > 0 ? "lab-page-break" : ""}>
              <div className="lab-title-block">
                <h1 style={{ color: "#000", fontWeight: 700 }}>{lab.title}</h1>
                <p className="meta">
                  {lab.focus ? `${lab.focus} | ` : ""}
                  {lab.level ?? ""}
                  {lab.date ? ` | ${lab.date}` : ""}
                </p>
                <p>{lab.summary}</p>
                {lab.tools?.length ? (
                  <p className="meta"><strong>Tools:</strong> {lab.tools.join(", ")}</p>
                ) : null}
              </div>

              {lab.stepDetails && lab.stepDetails.length > 0 ? (
                <>
                  <h2 style={{ color: "#000", fontWeight: 700, borderBottom: "2px solid #000" }}>Commands</h2>
                  {lab.stepDetails.map((step, i) => (
                    <section key={i} className="lab-step lab-section">
                      <h3 style={{ color: "#000", fontWeight: 700 }}>{i + 1}. {step.title}</h3>
                      {step.description ? <p>{step.description}</p> : null}
                      {step.command ? <pre>{step.command}</pre> : null}
                      {step.commandBreakdown ? <div className="breakdown">{step.commandBreakdown}</div> : null}
                    </section>
                  ))}
                </>
              ) : lab.steps?.length ? (
                <>
                  <h2 style={{ color: "#000", fontWeight: 700, borderBottom: "2px solid #000" }}>Steps</h2>
                  <ol style={{ paddingLeft: "1.25rem", margin: "0.25rem 0" }}>
                    {lab.steps.map((s, i) => (
                      <li key={i} style={{ margin: "0.15rem 0", fontSize: "9.5pt", color: "#000" }}>{s}</li>
                    ))}
                  </ol>
                </>
              ) : null}

              {lab.keyFindings?.length ? (
                <section className="lab-section">
                  <h2 style={{ color: "#000", fontWeight: 700, borderBottom: "2px solid #000" }}>Key Findings</h2>
                  <ul style={{ paddingLeft: "1.25rem", margin: "0.25rem 0" }}>
                    {lab.keyFindings.map((f, i) => (
                      <li key={i} style={{ margin: "0.1rem 0", fontSize: "9.5pt", color: "#000" }}>{f}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {lab.securityControlsRelevant?.length ? (
                <section className="lab-section">
                  <h2 style={{ color: "#000", fontWeight: 700, borderBottom: "2px solid #000" }}>Security Controls</h2>
                  <ul style={{ paddingLeft: "1.25rem", margin: "0.25rem 0" }}>
                    {lab.securityControlsRelevant.map((c, i) => (
                      <li key={i} style={{ margin: "0.1rem 0", fontSize: "9.5pt", color: "#000" }}>{c}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
