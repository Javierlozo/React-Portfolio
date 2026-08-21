import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { NOTES_REPOS, type NotesRepo } from "../../../data/notes";
import { getNotesInSection } from "../../../lib/notes-mdx";

interface Params {
  repo: string;
}

interface Props {
  params: Promise<Params>;
}

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

function findRepo(repoSlug: string) {
  return NOTES_REPOS.find((r) => r.repoName === repoSlug);
}

export function generateStaticParams() {
  return NOTES_REPOS.map((r) => ({ repo: r.repoName }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo } = await params;
  const r = findRepo(repo);
  if (!r) return { title: "Repo not found" };
  return {
    title: `${r.name}. Notes`,
    description: r.blurb,
    alternates: { canonical: `https://www.luislozoya.com/notes/${repo}` },
  };
}

export default async function RepoPage({ params }: Props) {
  const { repo } = await params;
  const r = findRepo(repo);
  if (!r) notFound();

  const sections = r.sections.map((section) => ({
    ...section,
    notes: getNotesInSection(r.repoName, section.slug),
  }));

  const totalNotes = sections.reduce((acc, s) => acc + s.notes.length, 0);
  const badge = STATUS_BADGE[r.status];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> All notes
        </Link>

        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-5">
            <Image
              src={r.logoUrl}
              alt={`${r.name} badge`}
              width={80}
              height={80}
              className="shrink-0 w-20 h-20 rounded-xl object-contain"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide border ${badge.className}`}
                >
                  {badge.label}
                </span>
                <span className="text-xs text-content-muted">
                  {r.cert}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-tight text-content">
                {r.name}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed mb-5 text-gray-700 dark:text-gray-300 max-w-3xl">
            {r.blurb}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={r.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 dark:hover:bg-white"
            >
              <FontAwesomeIcon icon={faGithub} />
              {r.repoName}
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
            <span className="text-xs text-content-subtle">
              {totalNotes} {totalNotes === 1 ? "note" : "notes"} ·{" "}
              {sections.length} sections
            </span>
          </div>
        </header>

        {/* Sticky anchor nav */}
        <nav className="sticky top-16 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-3 mb-10 border-y border-gray-200 dark:border-gray-700/70 bg-[#FAFAF9]/90 dark:bg-[#0B1220]/90 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAF9]/70 dark:supports-[backdrop-filter]:bg-[#0B1220]/70">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.slug}>
                <a
                  href={`#${section.slug}`}
                  className="font-medium text-content-muted hover:text-amber-700 dark:hover:text-amber-300 whitespace-nowrap"
                >
                  {section.title}
                  {section.notes.length > 0 && (
                    <span className="ml-1.5 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                      {section.notes.length}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12 sm:space-y-14">
          {sections.map((section) => (
            <section
              key={section.slug}
              id={section.slug}
              className="scroll-mt-32"
            >
              <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-gray-200 dark:border-gray-700/70">
                <h2 className="text-xl sm:text-2xl font-semibold text-content">
                  {section.title}
                </h2>
                <a
                  href={`${r.repoUrl}/tree/main/${section.slug}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-content-subtle hover:text-amber-700 dark:hover:text-amber-300 shrink-0"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  Folder on GitHub
                </a>
              </div>

              {section.notes.length === 0 ? (
                <p className="text-sm text-content-subtle italic">
                  No notes yet. Coming up as I work through this section.
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {section.notes.map((note) => (
                    <li key={note.slug}>
                      <Link
                        href={`/notes/${r.repoName}/${section.slug}/${note.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/40 px-4 py-3 hover:border-amber-400 dark:hover:border-amber-500/60 transition-colors"
                      >
                        <div className="p-1.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 shrink-0">
                          <FontAwesomeIcon
                            icon={faFileLines}
                            className="text-xs"
                          />
                        </div>
                        <span className="flex-1 text-sm sm:text-base font-medium text-content">
                          {note.title}
                        </span>
                        {note.labsTotal !== undefined && (
                          <span className="font-mono text-[11px] tabular-nums px-2 py-0.5 rounded-full border border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300 shrink-0">
                            {note.labsDone ?? 0} / {note.labsTotal} labs
                          </span>
                        )}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-xs text-gray-400 group-hover:text-amber-500 transition-colors"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
