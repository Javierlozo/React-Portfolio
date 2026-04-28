import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface StandaloneBlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  body: string;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
}

function readPost(filename: string): StandaloneBlogPost | null {
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  if (!fm.title || !fm.date) return null;
  return {
    slug: filename.replace(/\.mdx?$/, ""),
    title: fm.title,
    description: fm.description ?? "",
    date: fm.date,
    tags: fm.tags ?? [],
    thumbnail: fm.thumbnail,
    body: content,
  };
}

export function getStandalonePosts(): StandaloneBlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p): p is StandaloneBlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getStandalonePost(slug: string): StandaloneBlogPost | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    const post = readPost(filename);
    if (post) return post;
  }
  return null;
}
