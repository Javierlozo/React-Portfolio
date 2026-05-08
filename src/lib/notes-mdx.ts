import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_ROOT = path.join(process.cwd(), "content", "notes");

export interface NoteFile {
  repo: string;
  section: string;
  slug: string;
  title: string;
  source?: string;
  body: string;
}

export interface NoteSection {
  repo: string;
  section: string;
  notes: NoteFile[];
}

interface Frontmatter {
  title?: string;
  source?: string;
}

function readNote(repo: string, section: string, file: string): NoteFile | null {
  const filePath = path.join(NOTES_ROOT, repo, section, file);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  const slug = file.replace(/\.mdx?$/, "");
  return {
    repo,
    section,
    slug,
    title: fm.title ?? slug,
    source: fm.source,
    body: content,
  };
}

export function getRepoSlugs(): string[] {
  if (!fs.existsSync(NOTES_ROOT)) return [];
  return fs
    .readdirSync(NOTES_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

export function getSectionSlugs(repo: string): string[] {
  const dir = path.join(NOTES_ROOT, repo);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function getNotesInSection(repo: string, section: string): NoteFile[] {
  const dir = path.join(NOTES_ROOT, repo, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readNote(repo, section, f))
    .filter((n): n is NoteFile => n !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getNote(
  repo: string,
  section: string,
  slug: string,
): NoteFile | null {
  for (const ext of [".md", ".mdx"]) {
    const note = readNote(repo, section, `${slug}${ext}`);
    if (note) return note;
  }
  return null;
}

export function getAllNoteParams(): {
  repo: string;
  section: string;
  slug: string;
}[] {
  const params: { repo: string; section: string; slug: string }[] = [];
  for (const repo of getRepoSlugs()) {
    for (const section of getSectionSlugs(repo)) {
      for (const note of getNotesInSection(repo, section)) {
        params.push({ repo, section, slug: note.slug });
      }
    }
  }
  return params;
}

export function getAllSectionParams(): { repo: string; section: string }[] {
  const params: { repo: string; section: string }[] = [];
  for (const repo of getRepoSlugs()) {
    for (const section of getSectionSlugs(repo)) {
      params.push({ repo, section });
    }
  }
  return params;
}
