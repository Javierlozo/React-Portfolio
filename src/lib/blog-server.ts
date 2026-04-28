import "server-only";

import {
  LAB_POSTS,
  type BlogPost,
  type StandaloneBlogPost,
} from "../data/blog";
import { getStandalonePosts } from "./blog-mdx";

function buildStandalonePosts(): StandaloneBlogPost[] {
  return getStandalonePosts().map((p) => ({
    kind: "mdx" as const,
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
    thumbnail: p.thumbnail,
    href: `/blog/${p.slug}`,
  }));
}

export function getAllBlogPosts(): BlogPost[] {
  return [...LAB_POSTS, ...buildStandalonePosts()].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}
