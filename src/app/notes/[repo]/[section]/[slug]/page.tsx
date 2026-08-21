import type { Metadata } from "next";
import { containerShell } from "../../../../../components/ui/Section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  getAllNoteParams,
  getNote,
  getNotesInSection,
} from "../../../../../lib/notes-mdx";
import { NOTES_REPOS } from "../../../../../data/notes";
import NoteMarkdown from "../../../../../components/NoteMarkdown";

interface Params {
  repo: string;
  section: string;
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

function findRepo(repoSlug: string) {
  return NOTES_REPOS.find((r) => r.repoName === repoSlug);
}

function findSection(repoSlug: string, sectionSlug: string) {
  const repo = findRepo(repoSlug);
  return repo?.sections.find((s) => s.slug === sectionSlug);
}

export function generateStaticParams() {
  return getAllNoteParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo, section, slug } = await params;
  const note = getNote(repo, section, slug);
  if (!note) return { title: "Note not found" };
  const r = findRepo(repo);
  const s = findSection(repo, section);
  const url = `https://www.luislozoya.com/notes/${repo}/${section}/${slug}`;
  return {
    title: `${note.title}${r ? `. ${r.shortName}` : ""}`,
    description: `${note.title}${s ? ` (${s.title})` : ""}. Public study notes by Luis Javier Lozoya.`,
    alternates: { canonical: url },
    openGraph: {
      title: note.title,
      description: `Notes on ${note.title.toLowerCase()}.`,
      url,
      type: "article",
    },
  };
}

function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function extractH2Headings(body: string): { text: string; slug: string }[] {
  const matches = Array.from(body.matchAll(/^##\s+(.+?)\s*$/gm));
  return matches.map((m) => {
    const text = m[1].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return { text, slug };
  });
}

function getAdjacent(repo: string, section: string, slug: string) {
  const notes = getNotesInSection(repo, section);
  const idx = notes.findIndex((n) => n.slug === slug);
  return {
    prev: idx > 0 ? notes[idx - 1] : null,
    next: idx >= 0 && idx < notes.length - 1 ? notes[idx + 1] : null,
  };
}

export default async function NotePage({ params }: Props) {
  const { repo, section, slug } = await params;
  const note = getNote(repo, section, slug);
  if (!note) notFound();
  const r = findRepo(repo);
  const s = findSection(repo, section);
  const minutes = readingTimeMinutes(note.body);
  const headings = extractH2Headings(note.body);
  const { prev, next } = getAdjacent(repo, section, slug);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-surface">
      <div className={containerShell("prose")}>
        <article>
          <Link
            href={`/notes/${repo}#${section}`}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            {s ? `Back to ${s.title}` : "Back"}
          </Link>

          <header className="mb-8 sm:mb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-2 text-amber-700 dark:text-amber-400">
              {r?.shortName}
              {s ? ` · ${s.title}` : ""}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-thin leading-tight tracking-tight mb-4 text-content">
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-content-subtle">
              <span>{minutes} min read</span>
              {note.topic && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <a
                    href={note.topic}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    PortSwigger topic
                  </a>
                </>
              )}
              {note.source && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <a
                    href={note.source}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    Source on GitHub
                  </a>
                </>
              )}
            </div>
          </header>

          {headings.length > 2 && (
            <nav
              aria-label="On this page"
              className="not-prose mb-12 rounded-2xl border border-gray-200 dark:border-gray-700/70 bg-white dark:bg-gray-800/40 p-5 sm:p-6"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-4">
                On this page
              </p>
              <ol className="space-y-2.5">
                {headings.map((h, i) => (
                  <li
                    key={h.slug}
                    className="flex items-baseline gap-3 text-sm sm:text-base"
                  >
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500 tabular-nums shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${h.slug}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <NoteMarkdown body={note.body} />

          {(prev || next) && (
            <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prev ? (
                  <Link
                    href={`/notes/${repo}/${section}/${prev.slug}`}
                    className="group rounded-xl p-4 border border-divider bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors"
                  >
                    <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-content-subtle group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      <FontAwesomeIcon icon={faArrowLeft} /> Previous
                    </p>
                    <p className="text-sm font-semibold text-content line-clamp-2">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next ? (
                  <Link
                    href={`/notes/${repo}/${section}/${next.slug}`}
                    className="group rounded-xl p-4 border border-divider bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors text-right"
                  >
                    <p className="flex items-center justify-end gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-content-subtle group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      Next <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                    <p className="text-sm font-semibold text-content line-clamp-2">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
              </div>
            </nav>
          )}
        </article>
      </div>
    </div>
  );
}
