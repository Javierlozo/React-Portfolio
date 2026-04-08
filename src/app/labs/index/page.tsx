import { Metadata } from "next";
import { LABS } from "../../../data/labs";
import PrintableIndex from "../../../components/PrintableIndex";

export const metadata: Metadata = {
  title: "GSEC Exam Index",
  description: "Printable GSEC exam index extracted from SEC401 security labs.",
  robots: { index: false, follow: false },
};

export interface IndexEntry {
  ref: string; // "Book.Page" e.g. "1.032"
  term: string;
  answer: string;
}

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];
  const publishedLabs = LABS.filter((l) => !l.comingSoon);

  for (const lab of publishedLabs) {
    // Commands with their flag breakdowns become entries
    if (lab.stepDetails) {
      for (const step of lab.stepDetails) {
        if (step.command) {
          const commands = step.command.split("\n");
          for (const cmd of commands) {
            entries.push({
              ref: "",
              term: cmd.trim().split(/\s+/)[0].replace(/^sudo$/, ""),
              answer: `${cmd.trim()} -- ${step.title}`,
            });
          }

          if (step.commandBreakdown) {
            for (const line of step.commandBreakdown.split("\n")) {
              const [flag, ...desc] = line.split(":");
              if (flag && desc.length > 0) {
                entries.push({
                  ref: "",
                  term: flag.trim(),
                  answer: desc.join(":").trim(),
                });
              }
            }
          }
        }
      }
    }

    // Tools
    for (const tool of lab.tools) {
      entries.push({
        ref: "",
        term: tool,
        answer: `${lab.focus ?? "Security"} tool used in ${lab.title}`,
      });
    }

    // Key findings as entries (the actual answers)
    if (lab.keyFindings) {
      for (const finding of lab.keyFindings) {
        // Extract a short term from the finding
        const term = finding.split(":")[0].split(",")[0].trim();
        entries.push({
          ref: "",
          term,
          answer: finding,
        });
      }
    }

    // Security controls
    if (lab.securityControlsRelevant) {
      for (const control of lab.securityControlsRelevant) {
        entries.push({
          ref: "",
          term: control.split("(")[0].split(",")[0].trim(),
          answer: control,
        });
      }
    }

    // Skills as searchable terms
    if (lab.skillsDemonstrated) {
      for (const skill of lab.skillsDemonstrated) {
        entries.push({
          ref: "",
          term: skill,
          answer: `Demonstrated in ${lab.title}`,
        });
      }
    }
  }

  // Deduplicate by term (case-insensitive), keep the entry with the longer answer
  const byTerm = new Map<string, IndexEntry>();
  for (const e of entries) {
    const key = e.term.toLowerCase();
    const existing = byTerm.get(key);
    if (!existing || e.answer.length > existing.answer.length) {
      byTerm.set(key, e);
    }
  }

  return Array.from(byTerm.values()).sort((a, b) =>
    a.term.localeCompare(b.term, undefined, { sensitivity: "base" })
  );
}

export default function LabIndexPage() {
  const entries = buildIndex();
  return <PrintableIndex entries={entries} />;
}
