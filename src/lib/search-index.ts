import "server-only";

import { LABS, getLabPath } from "../data/labs";
import { getBlogPostHref } from "../data/blog";
import { getAllBlogPosts } from "./blog-server";
import { getRepoSlugs, getSectionSlugs, getNotesInSection } from "./notes-mdx";
import { NOTES_REPOS } from "../data/notes";

export type SearchKind = "lab" | "writing" | "note";

export interface SearchDoc {
  id: string;
  label: string;
  kind: SearchKind;
  /** Shown under the label. Course, date, or repo name. */
  hint?: string;
  /** Matched on, not displayed. Tools, tags, focus area. */
  terms: string[];
  href: string;
}

/**
 * Everything searchable that lives outside the hardcoded page list: labs,
 * blog posts, and note pages. Built on the server so the client bundle does
 * not carry the MDX layer, then handed to CommandPalette as a prop.
 */
export function getSearchIndex(): SearchDoc[] {
  const labs: SearchDoc[] = LABS.filter((l) => !l.comingSoon).map((lab) => ({
    id: `lab-${lab.id}`,
    label: lab.title,
    kind: "lab",
    hint: lab.focus,
    terms: [
      lab.focus,
      lab.level,
      ...(lab.tools ?? []),
      ...(lab.skillsDemonstrated ?? []),
    ].filter((t): t is string => Boolean(t)),
    href: getLabPath(lab),
  }));

  // Lab-backed posts already appear as labs. Only index standalone writing.
  const writing: SearchDoc[] = getAllBlogPosts()
    .filter((p) => p.kind === "mdx")
    .map((post) => ({
      id: `post-${post.slug}`,
      label: post.title,
      kind: "writing",
      hint: post.date,
      terms: [...(post.tags ?? []), post.description ?? ""].filter(Boolean),
      href: getBlogPostHref(post),
    }));

  const repoName = (repo: string) =>
    NOTES_REPOS.find((r) => r.repoName === repo)?.shortName ?? repo;

  const notes: SearchDoc[] = [];
  for (const repo of getRepoSlugs()) {
    for (const section of getSectionSlugs(repo)) {
      for (const note of getNotesInSection(repo, section)) {
        notes.push({
          id: `note-${repo}-${section}-${note.slug}`,
          label: note.title,
          kind: "note",
          hint: `${repoName(repo)} · ${section.replace(/-/g, " ")}`,
          terms: [section, note.topic ?? "", note.source ?? ""].filter(Boolean),
          href: `/notes/${repo}/${section}/${note.slug}`,
        });
      }
    }
  }

  return [...labs, ...writing, ...notes];
}
