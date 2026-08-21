"use client";
import React from "react";
import { buttonPrimary, buttonSecondary } from "./ui/button";
import { containerShell } from "./ui/Section";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faTerminal,
  faCircleXmark,
  faArrowRight,
  faGithub,
  faNpm,
} from "../app/llm-audit/icons";
import { LLM_AUDIT_RULES } from "../data/llm-audit-rules";

const REPO_URL = "https://github.com/Javierlozo/llm-audit";
const NPM_URL = "https://www.npmjs.com/package/llm-audit";

// Three of the eight rules, picked for the home page because they read
// fastest at a glance. Full set lives on /llm-audit.
const FEATURED_IDS = [
  "untrusted-input-in-system-prompt",
  "llm-output-insecure-handling",
  "model-output-parsed-without-schema",
];

const featured = FEATURED_IDS.map((id) =>
  LLM_AUDIT_RULES.find((r) => r.id === id)
).filter((r): r is (typeof LLM_AUDIT_RULES)[number] => Boolean(r));

export default function LlmAuditFeature() {
  return (
    <section
      id="llm-audit"
      className="py-20 sm:py-24 bg-surface"
    >
      <div className={containerShell("feature")}>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-amber-700 dark:text-amber-400">
          <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
          Flagship project · Open source · MIT
        </p>
        <h2 className="text-3xl sm:text-4xl font-thin leading-tight tracking-tight mb-4 text-content">
          <span className="font-mono text-amber-600 dark:text-amber-400">
            llm-audit
          </span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl text-gray-700 dark:text-gray-300">
          Static analysis for TypeScript and JavaScript LLM applications.
          OWASP LLM Top 10 at commit time. It catches the security failure
          modes AI coding assistants quietly introduce, in the TS/JS ecosystem
          Semgrep&apos;s official AI pack does not cover.
        </p>

        {/* Install */}
        <div className="overflow-hidden rounded-xl border border-amber-300 bg-gray-950 shadow-md dark:border-amber-500/40 max-w-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTerminal}
                className="text-amber-400 text-xs"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                install
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
              shell
            </span>
          </div>
          <pre className="m-0 overflow-x-auto p-4 text-[13px] leading-relaxed text-gray-100 font-mono">
            <code>{`npm i -D llm-audit
npx llm-audit demo           # all 8 rules vs bundled vulnerable fixtures`}</code>
          </pre>
        </div>

        {/* What it catches */}
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wide mt-12 mb-6 text-amber-700 dark:text-amber-400">
          What it catches
        </h3>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((rule) => (
            <div
              key={rule.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/40 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-2">
                  {rule.owasp}
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {rule.oneLine}
                </p>
              </div>
              <div className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-gray-950">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-800 font-mono text-[10px] uppercase tracking-widest text-red-300">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-400"
                  />
                  vulnerable
                </div>
                <pre className="m-0 overflow-x-auto p-3 text-[11px] leading-relaxed text-gray-100 font-mono">
                  <code>{rule.vulnerable}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/llm-audit"
            className={buttonPrimary}
          >
            All 8 rules and how it works
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonSecondary}
          >
            <FontAwesomeIcon icon={faGithub} />
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonSecondary}
          >
            <FontAwesomeIcon icon={faNpm} className="text-[#cb3837]" />
            npm
          </a>
        </div>
      </div>
    </section>
  );
}
