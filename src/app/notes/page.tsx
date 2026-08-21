import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArrowRight,
  faGithub,
  faFolderTree,
} from "./icons";
import { NOTES_REPOS, NOTES_ROADMAP, type NotesRepo } from "../../data/notes";

export const metadata: Metadata = {
  title: "AppSec Notes. Learning in Public",
  description:
    "Public study notes from every security course I'm working through. TCM Practical Bug Bounty, PortSwigger Web Security Academy, and more. Plain markdown, my own words, dated commits.",
  keywords: [
    "AppSec",
    "web application security",
    "TCM Practical Bug Bounty",
    "PortSwigger Web Security Academy",
    "BSCP prep",
    "PWPA prep",
    "study notes",
    "Luis Javier Lozoya",
  ],
  alternates: { canonical: "https://www.luislozoya.com/notes" },
  openGraph: {
    title: "AppSec Notes. Learning in Public",
    description:
      "Public notes from the security courses I'm studying. TCM PBB, PortSwigger Academy, and more.",
    url: "https://www.luislozoya.com/notes",
    type: "website",
  },
};

const STATUS_BADGE: Record<
  NotesRepo["status"],
  { label: string; className: string }
> = {
  "in-progress": {
    label: "In progress",
    className:
      "bg-amber-600 text-white border-amber-700 dark:bg-amber-500 dark:text-gray-900 dark:border-amber-400",
  },
  upcoming: {
    label: "Upcoming",
    className:
      "bg-blue-600 text-white border-blue-700 dark:bg-blue-500 dark:text-gray-900 dark:border-blue-400",
  },
  done: {
    label: "Done",
    className:
      "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/40",
  },
};

const ROADMAP_BADGE: Record<
  (typeof NOTES_ROADMAP)[number]["status"],
  { label: string; className: string }
> = {
  "in-progress": {
    label: "In progress",
    className:
      "bg-amber-600 text-white border-amber-700 dark:bg-amber-500 dark:text-gray-900 dark:border-amber-400",
  },
  next: {
    label: "Next",
    className:
      "bg-blue-600 text-white border-blue-700 dark:bg-blue-500 dark:text-gray-900 dark:border-blue-400",
  },
  later: {
    label: "Later",
    className:
      "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700/40 dark:text-gray-300 dark:border-gray-600/40",
  },
};

function RepoCard({ repo }: { repo: NotesRepo }) {
  const badge = STATUS_BADGE[repo.status];
  const repoHref = `/notes/${repo.repoName}`;
  return (
    <article className="group relative rounded-2xl bg-white border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700/80 p-5 sm:p-6 md:p-7 hover:border-amber-400 dark:hover:border-amber-500/60 transition-colors flex flex-col h-full">
      {/* Stretched link covering the whole card */}
      <Link
        href={repoHref}
        aria-label={`Open ${repo.name} notes`}
        className="absolute inset-0 rounded-2xl z-0"
      />

      <div className="relative flex items-start gap-4 mb-4">
        <Image
          src={repo.logoUrl}
          alt={`${repo.name} badge`}
          width={64}
          height={64}
          className="shrink-0 w-16 h-16 rounded-lg object-contain"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide border ${badge.className}`}
            >
              {badge.label}
            </span>
            <span className="text-xs text-content-muted">
              {repo.cert}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-content leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            {repo.name}
          </h3>
        </div>
      </div>

      <p className="relative text-sm sm:text-base leading-relaxed mb-5 text-gray-700 dark:text-gray-300">
        {repo.blurb}
      </p>

      <div className="relative mb-5 flex-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider mb-2 text-amber-700 dark:text-amber-400">
          <FontAwesomeIcon icon={faFolderTree} className="mr-1.5" />
          Sections
        </p>
        <div className="flex flex-wrap gap-1.5">
          {repo.sections.map((section) => (
            <Link
              key={section.slug}
              href={`${repoHref}#${section.slug}`}
              className="relative z-10 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-divider hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/5 dark:hover:text-amber-300"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative flex flex-wrap gap-3 items-center">
        <Link
          href={repoHref}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 dark:hover:bg-white"
        >
          Read notes
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
        <a
          href={repo.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-surface-card text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-800 dark:text-gray-300 dark:border-gray-700 dark:hover:border-amber-500/50 dark:hover:text-amber-300"
        >
          <FontAwesomeIcon icon={faGithub} />
          GitHub
        </a>
      </div>
    </article>
  );
}

export default function NotesPage() {
  const activeCount = NOTES_REPOS.filter((r) => r.status === "in-progress").length;

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        {/* Hero */}
        <header className="mb-12 sm:mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-amber-700 dark:text-amber-400">
            <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
            Learning in public · {activeCount} active
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin leading-tight tracking-tight mb-5 text-content">
            AppSec{" "}
            <span className="font-mono text-amber-600 dark:text-amber-400">
              Notes
            </span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            Public notes from every security course I&apos;m working through.
            <span className="block mt-1 text-content-subtle">
              One repo per course. Plain markdown, my own words, dated
              commits.
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#security-labs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-surface-card text-gray-900 border-gray-300 hover:border-amber-400 hover:bg-amber-50 dark:text-gray-100 dark:border-gray-700 dark:hover:border-amber-500/50"
            >
              See hands-on labs
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </header>

        {/* Why */}
        <section className="mb-16">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Why public
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              If I think someone might actually read these, I take them more
              seriously. That&apos;s the whole point of doing it in public.
            </p>
            <p>
              Each commit is a small unit of progress, dated. The trail
              matters more than any one polished page.
            </p>
            <p>
              Lab writeups come from{" "}
              <strong className="text-content">
                authorized environments only
              </strong>
              : course labs, PortSwigger Academy, HackTheBox, my own homelab.
              Never client work, never embargoed bug bounty findings.
            </p>
          </div>
        </section>

        {/* Repos */}
        <section className="mb-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-2 text-amber-700 dark:text-amber-400">
            Courses I&apos;m working through
          </h2>
          <p className="text-sm sm:text-base mb-8 text-gray-600 dark:text-gray-400">
            One repo per course. Section chips link straight to that folder
            on GitHub.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {NOTES_REPOS.map((repo) => (
              <RepoCard key={repo.slug} repo={repo} />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Cert roadmap
          </h2>
          <div className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/80 p-5 sm:p-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
              Course notes feed into cert prep. As I get closer to each exam
              I&apos;ll spin up a dedicated prep repo so the commit history
              stays focused.
            </p>
            <ul className="space-y-3">
              {NOTES_ROADMAP.map((item) => {
                const badge = ROADMAP_BADGE[item.status];
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                  >
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide border ${badge.className} shrink-0`}
                    >
                      {badge.label}
                    </span>
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Further reading */}
        <section className="border-t border-gray-200 dark:border-gray-700/70 pt-8">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4 text-amber-700 dark:text-amber-400">
            Also on this site
          </h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link
                href="/#security-labs"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Security Labs
              </Link>
              <span className="text-content-subtle">
                . Hands-on writeups from SANS Cyber Academy with real captures
                and full methodology.
              </span>
            </li>
            <li>
              <Link
                href="/llm-audit"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                llm-audit
              </Link>
              <span className="text-content-subtle">
                . Open-source Semgrep rule pack for OWASP LLM Top 10 in
                TypeScript.
              </span>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Blog
              </Link>
              <span className="text-content-subtle">
                . Long-form posts on security tooling and what I&apos;ve
                shipped.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
