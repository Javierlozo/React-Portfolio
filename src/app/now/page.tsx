import type { Metadata } from "next";
import { certTimeline } from "../../data/learningPath";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faArrowRight,
  faGithub,
} from "../llm-audit/icons";

export const metadata: Metadata = {
  title: "Now. What I'm working on",
  description:
    "What Luis Javier Lozoya is working on right now. AWS Security Specialty (SCS-C02) and BSCP in progress, llm-audit development, and open to Application Security Engineer roles.",
  keywords: [
    "Application Security Engineer",
    "AWS Security Specialty",
    "SCS-C02",
    "BSCP",
    "llm-audit",
    "AI security",
    "Luis Javier Lozoya",
    "now page",
  ],
  alternates: { canonical: "https://www.luislozoya.com/now" },
  openGraph: {
    title: "Now. What I'm working on",
    description:
      "Current focus: AWS Security Specialty, BSCP, llm-audit, and Application Security Engineer roles.",
    url: "https://www.luislozoya.com/now",
    type: "website",
  },
};

// Update this page when the facts change. The date below is the last edit.
const LAST_UPDATED = "August 2026";

const WORKING_ON = [
  "Passed GIAC GCIH (SEC504) in August 2026. The labs are published here: live PowerShell investigation, RITA beacon detection, Hayabusa log triage, and Nmap discovery.",
  "PortSwigger BSCP prep. Web pentesting is a skill I keep sharp, not my identity.",
  "Building llm-audit. Five OWASP LLM Top 10 rules shipped in v0, more coming for the TS/JS ecosystem Semgrep's official AI pack does not cover.",
  "Studying for AWS AI Practitioner (AIF-C01, Sept 2026) and AWS Security Specialty (SCS-C02, Oct 2026). IAM least-privilege, CloudTrail detection, and Cognito hardening against enumeration.",
];


export default function NowPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-amber-700 dark:text-amber-400">
          <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
          Updated {LAST_UPDATED}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin leading-tight tracking-tight mb-5 text-content">
          Now
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed mb-12 text-gray-700 dark:text-gray-300">
          What I&apos;m working on this month. Application Security Engineer
          in Charleston, SC, with 5+ years of software engineering behind me.
        </p>

        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-5 text-amber-700 dark:text-amber-400">
            Working on
          </h2>
          <ul className="space-y-4">
            {WORKING_ON.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              >
                <span
                  aria-hidden
                  className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-5 text-amber-700 dark:text-amber-400">
            Certifications
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm sm:text-base">
              <tbody>
                {certTimeline.map((c, i) => (
                  <tr
                    key={c.name}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-gray-900/40"
                        : "bg-gray-50 dark:bg-gray-900/20"
                    }
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      <span
                        className={
                          c.status === "Passed"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : c.status === "In progress"
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-content-subtle whitespace-nowrap">
                      {c.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Open to
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Application Security, Product Security, and AI Security roles.
            Remote. I reply within 24 hours to recruiters and hiring managers.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/llm-audit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 dark:hover:bg-white"
          >
            See llm-audit
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
          <a
            href="https://github.com/Javierlozo"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-surface-card text-gray-900 border-gray-300 hover:border-amber-400 hover:bg-amber-50 dark:text-gray-100 dark:border-gray-700 dark:hover:border-amber-500/50"
          >
            <FontAwesomeIcon icon={faGithub} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
