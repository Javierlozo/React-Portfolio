import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
    title: `${note.title}${r ? ` — ${r.shortName}` : ""}`,
    description: `${note.title}${s ? ` (${s.title})` : ""} — public study notes by Luis Javier Lozoya.`,
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
  const { prev, next } = getAdjacent(repo, section, slug);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{minutes} min read</span>
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

          <NoteMarkdown body={note.body} />

          {(prev || next) && (
            <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prev ? (
                  <Link
                    href={`/notes/${repo}/${section}/${prev.slug}`}
                    className="group rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors"
                  >
                    <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      <FontAwesomeIcon icon={faArrowLeft} /> Previous
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next ? (
                  <Link
                    href={`/notes/${repo}/${section}/${next.slug}`}
                    className="group rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors text-right"
                  >
                    <p className="flex items-center justify-end gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      Next <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
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
