import type { Metadata } from "next";
import { buttonPrimary, buttonSecondary } from "../../components/ui/button";
import { containerShell } from "../../components/ui/Section";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faTerminal,
  faCircleCheck,
  faCircleXmark,
  faArrowRight,
  faGithub,
  faNpm,
} from "./icons";
import { LLM_AUDIT_RULES } from "../../data/llm-audit-rules";

export const metadata: Metadata = {
  title: "llm-audit: Static Analysis for TypeScript LLM Applications",
  description:
    "A Semgrep rule pack for OWASP LLM Top 10 in TypeScript and JavaScript. Catches the security failure modes AI coding assistants quietly introduce. MIT, runs at commit time.",
  keywords: [
    "llm-audit",
    "llm security",
    "static analysis",
    "OWASP LLM Top 10",
    "prompt injection",
    "TypeScript",
    "Next.js",
    "Vercel AI SDK",
    "AI security",
    "Semgrep",
  ],
  alternates: { canonical: "https://www.luislozoya.com/llm-audit" },
  openGraph: {
    title: "llm-audit: Static Analysis for TypeScript LLM Applications",
    description:
      "OWASP LLM Top 10 at commit time. The TS/JS niche Semgrep's official AI pack does not cover.",
    url: "https://www.luislozoya.com/llm-audit",
    type: "website",
  },
};

const REPO_URL = "https://github.com/Javierlozo/llm-audit";
const NPM_URL = "https://www.npmjs.com/package/llm-audit";
const BLOG_URL = "/blog/building-llm-audit";

function CodeWindow({
  code,
  language,
  intent,
}: {
  code: string;
  language: string;
  intent: "vulnerable" | "safe";
}) {
  const labelColor =
    intent === "vulnerable"
      ? "text-red-300 dark:text-red-300"
      : "text-emerald-300 dark:text-emerald-300";
  const iconColor =
    intent === "vulnerable" ? "text-red-400" : "text-emerald-400";
  const Icon = intent === "vulnerable" ? faCircleXmark : faCircleCheck;
  const label = intent === "vulnerable" ? "vulnerable" : "safe";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-sm dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="block h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="block h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
          <span className={`flex items-center gap-1.5 ${labelColor}`}>
            <FontAwesomeIcon icon={Icon} className={iconColor} />
            {label}
          </span>
          <span className="text-gray-500">{language}</span>
        </div>
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-[12px] sm:text-[13px] leading-relaxed text-gray-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function LlmAuditPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-surface">
      <div className={containerShell("feature")}>
        {/* Hero */}
        <header className="mb-12 sm:mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-amber-700 dark:text-amber-400">
            <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
            Open source · MIT · v0.0.10
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin leading-tight tracking-tight mb-5 text-content">
            <span className="font-mono text-amber-600 dark:text-amber-400">
              llm-audit
            </span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            Static analysis for TypeScript and JavaScript LLM applications.
            <span className="block mt-1 text-content-subtle">
              OWASP LLM Top 10 at commit time. A complement to Semgrep&apos;s
              <code className="mx-1.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">
                p/ai-best-practices
              </code>
              for the TS/JS ecosystem the upstream pack does not cover.
            </span>
          </p>

          {/* Quick demo */}
          <div className="overflow-hidden rounded-xl border border-amber-300 bg-gray-950 shadow-md dark:border-amber-500/40">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faTerminal}
                  className="text-amber-400 text-xs"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  see it work in 5 seconds
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                shell
              </span>
            </div>
            <pre className="m-0 overflow-x-auto p-4 text-[13px] leading-relaxed text-gray-100 font-mono">
              <code>{`brew install semgrep         # one-time
npx llm-audit demo           # all 12 rules vs bundled vulnerable fixtures`}</code>
            </pre>
          </div>
          <p className="text-sm mt-2 text-content-subtle">
            No install in your repo, no config file, no flags. Real findings on
            real intentionally-vulnerable code so you can see what the rules
            catch before deciding to adopt.
          </p>

          {/* Full install */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-sm dark:border-gray-800 mt-5">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
              <FontAwesomeIcon
                icon={faTerminal}
                className="text-amber-500/80 text-xs"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                adopt in your project
              </span>
            </div>
            <pre className="m-0 overflow-x-auto p-4 text-[13px] leading-relaxed text-gray-100 font-mono">
              <code>{`npm i -D llm-audit
npx llm-audit init           # writes .husky/pre-commit + GH Action
npx llm-audit scan           # run on your own code`}</code>
            </pre>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonPrimary}
            >
              <FontAwesomeIcon icon={faGithub} />
              GitHub
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
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
            <Link
              href={BLOG_URL}
              className={buttonSecondary}
            >
              Blog post: how I built it
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </header>

        {/* Why */}
        <section className="mb-16">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Why this exists
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              AI coding assistants reproduce a small, predictable set of
              LLM-application bugs. Hardcoded keys. Untrusted input flowing
              into the <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">system</code> role.
              Model output piped into{" "}
              <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">eval</code>.
              The new web-app classics.
            </p>
            <p>
              The strongest existing rule pack, Semgrep&apos;s official{" "}
              <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">p/ai-best-practices</code>,
              ships 27 rules. Zero of them target JavaScript or TypeScript.
              Run it on a Next.js + Vercel AI SDK repo and it returns nothing.
            </p>
            <p>
              <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">llm-audit</code>{" "}
              fills that niche. Twelve rules, mapped explicitly to OWASP
              LLM Top 10, distributed as a Semgrep pack with a thin npm CLI
              on top. Runs at pre-commit and in CI.
            </p>
          </div>
        </section>

        {/* Rules */}
        <section className="mb-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-2 text-amber-700 dark:text-amber-400">
            Rules in v0
          </h2>
          <p className="text-sm sm:text-base mb-8 text-gray-600 dark:text-gray-400">
            Each rule below shows the shape it catches and the canonical fix.
            Click through to{" "}
            <a
              href={`${REPO_URL}/blob/main/docs/RULES.md`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
            >
              <code>docs/RULES.md</code>
            </a>{" "}
            in the repo for the full v1 plan and rule rationale.
          </p>

          <div className="space-y-10">
            {LLM_AUDIT_RULES.map((rule) => (
              <article
                key={rule.id}
                className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700/80 p-5 sm:p-7"
              >
                <header className="mb-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider ${
                        rule.severity === "ERROR"
                          ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30"
                          : "bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/30"
                      }`}
                    >
                      {rule.severity}
                    </span>
                    <span className="inline-flex items-baseline gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full font-mono font-semibold tracking-wider bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">
                        {rule.owasp.split(":")[0].trim()}
                      </span>
                      {rule.owasp.includes(":") && (
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {rule.owasp.split(":").slice(1).join(":").trim()}
                        </span>
                      )}
                    </span>
                    {rule.cwe.map((cwe) => (
                      <span
                        key={cwe}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {cwe}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-mono text-base sm:text-lg font-semibold text-content mb-2">
                    {rule.id}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {rule.oneLine}
                  </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                  <CodeWindow
                    code={rule.vulnerable}
                    language={rule.language}
                    intent="vulnerable"
                  />
                  <CodeWindow
                    code={rule.safe}
                    language={rule.language}
                    intent="safe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg p-4 bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/20">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-amber-700 dark:text-amber-400">
                      Why an AI assistant writes this
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {rule.whyAiWritesIt}
                    </p>
                  </div>
                  <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800/60 border border-divider">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-gray-600 dark:text-gray-400">
                      Fix
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {rule.fix}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Use */}
        <section className="mb-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Use it in your repo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-amber-300 dark:bg-gray-800/50 dark:border-amber-500/30 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-2 text-amber-700 dark:text-amber-400">
                Try the rules in 5 seconds
              </p>
              <pre className="m-0 overflow-x-auto p-3 text-[13px] leading-relaxed bg-gray-950 text-gray-100 rounded-lg font-mono">
                <code>npx llm-audit demo</code>
              </pre>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Runs all 12 rules against the bundled vulnerable fixtures. No
                project setup, no config. Requires Semgrep on PATH.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/80 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-2 text-amber-700 dark:text-amber-400">
                One-shot scan of your repo
              </p>
              <pre className="m-0 overflow-x-auto p-3 text-[13px] leading-relaxed bg-gray-950 text-gray-100 rounded-lg font-mono">
                <code>npx llm-audit scan</code>
              </pre>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Runs the rule pack against the current directory. Useful as a
                pre-adoption check on a real codebase.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/80 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-2 text-amber-700 dark:text-amber-400">
                Wire pre-commit + CI
              </p>
              <pre className="m-0 overflow-x-auto p-3 text-[13px] leading-relaxed bg-gray-950 text-gray-100 rounded-lg font-mono">
                <code>{`npm i -D llm-audit
npx llm-audit init`}</code>
              </pre>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Writes a husky pre-commit hook and a GitHub Action workflow.
                Refuses to overwrite existing files unless you pass{" "}
                <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">
                  --force
                </code>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Agent integration */}
        <section className="mb-16">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Use with AI coding assistants
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-5">
            <p>
              The bugs <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">llm-audit</code> catches
              are mostly produced <em>by</em> AI coding assistants, so the
              highest-leverage place to invoke it is inside the assistant
              itself. The package ships a project-local{" "}
              <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">SKILL.md</code>{" "}
              for Claude Code, Cursor, Codex CLI, and any tool that reads the
              universal skills format. Drop it into your repo with one
              command:
            </p>
          </div>

          <pre className="m-0 mb-5 overflow-x-auto p-4 text-sm leading-relaxed text-gray-100 font-mono bg-gray-950 rounded-lg">
            <code>npx llm-audit init --skill-only</code>
          </pre>

          <p className="text-base leading-relaxed mb-5 text-gray-700 dark:text-gray-300">
            The skill autoloads when the agent edits LLM-integrated code or
            before commits that touch it, tells it when to invoke{" "}
            <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">npx llm-audit scan --json</code>,
            and gives it the canonical fix per OWASP entry. If you&apos;d
            rather not commit a <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">.claude/skills/</code>{" "}
            file, paste an equivalent instruction into your agent rules
            (<code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">CLAUDE.md</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">.cursorrules</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">AGENTS.md</code>);
            see the README for the snippet.
          </p>

          <p className="text-base leading-relaxed text-content-subtle">
            The JSON envelope is a stable contract (<code className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 text-[0.875em]">schemaVersion: 1</code>),
            so agents can rely on the field names without breaking on a
            future release.
          </p>
        </section>

        {/* Roadmap */}
        <section className="mb-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            v1 roadmap
          </h2>
          <div className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/80 p-5 sm:p-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Seven more rules planned, each mapped to an OWASP LLM Top 10
              entry, with vulnerable + safe fixtures and rationale documented
              in the repo.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> Tool-call
                handler without an allowlist (LLM08)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> Untrusted
                retrieval context in the system role (LLM01)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> System
                prompt leakage in client bundles (LLM07)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> Sensitive
                context (env, PII) inlined into prompts (LLM06)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> Model
                output rendered as markdown without sanitization (LLM09)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> LLM route
                handler without zod / valibot validation
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 shrink-0">·</span> Streaming
                response without abort handling
              </li>
            </ul>
          </div>
        </section>

        {/* Footer / further reading */}
        <section className="border-t border-gray-200 dark:border-gray-700/70 pt-8">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Further reading
          </h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link
                href={BLOG_URL}
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Building llm-audit
              </Link>
              <span className="text-content-subtle">
                . The announcement post, including how it found a real LLM02
                bug in this very portfolio.
              </span>
            </li>
            <li>
              <a
                href={`${REPO_URL}/blob/main/docs/COMPETITIVE-LANDSCAPE.md`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Competitive landscape
              </a>
              <span className="text-content-subtle">
                . Empirical comparison vs Semgrep&apos;s p/ai-best-practices
                and other OSS / commercial options.
              </span>
            </li>
            <li>
              <a
                href={`${REPO_URL}/blob/main/docs/AI-FAILURE-MODES.md`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                AI failure modes
              </a>
              <span className="text-content-subtle">
                . Long-form rationale for why AI assistants reproduce each of
                these patterns.
              </span>
            </li>
            <li>
              <a
                href={`${REPO_URL}/blob/main/docs/SECURITY-AUDIT.md`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Self-audit
              </a>
              <span className="text-content-subtle">
                . The project&apos;s own security review, with findings and
                fixes shipped across 0.0.2 and 0.0.10.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
