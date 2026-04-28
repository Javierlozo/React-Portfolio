import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { getStandalonePost, getStandalonePosts } from "../../../lib/blog-mdx";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export function generateStaticParams() {
  return getStandalonePosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getStandalonePost(slug);
  if (!post) return { title: "Post not found" };
  const url = `https://www.luislozoya.com/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function getAdjacentPosts(slug: string) {
  const posts = getStandalonePosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export default async function BlogPostPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;
  const post = getStandalonePost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const minutes = readingTimeMinutes(post.body);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
        <article className="w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to blog
          </Link>

          <header className="mb-8 sm:mb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide mb-3 text-amber-700 dark:text-amber-400">
              Writing
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-base sm:text-lg leading-relaxed mb-5 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date} className="font-medium">
                {formattedDate}
              </time>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <span className="inline-flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className="text-amber-500/80" />
                {minutes} min read
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <FontAwesomeIcon
                  icon={faTag}
                  className="text-xs text-gray-400 dark:text-gray-500"
                />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="
              prose prose-slate dark:prose-invert max-w-none
              prose-headings:scroll-mt-24
              prose-h2:font-mono prose-h2:text-base prose-h2:uppercase prose-h2:tracking-wide prose-h2:font-semibold
              prose-h2:text-amber-700 dark:prose-h2:text-amber-400
              prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2
              prose-h2:border-b prose-h2:border-amber-200/60 dark:prose-h2:border-amber-500/20
              prose-h3:text-gray-900 dark:prose-h3:text-white prose-h3:font-semibold prose-h3:text-lg
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-amber-800 dark:prose-code:text-amber-300
              prose-code:bg-amber-50 dark:prose-code:bg-amber-500/10
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-code:before:content-none prose-code:after:content-none
              prose-code:font-medium prose-code:text-[0.875em]
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100
              prose-pre:border prose-pre:border-gray-800
              prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
              [&_pre_code]:bg-transparent [&_pre_code]:text-gray-100 [&_pre_code]:p-0
              prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50/50
              dark:prose-blockquote:bg-amber-500/5
              prose-blockquote:rounded-r prose-blockquote:py-1
              prose-blockquote:not-italic prose-blockquote:font-normal
              prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-table:text-sm
              prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-semibold
              prose-th:bg-gray-100 dark:prose-th:bg-gray-800/60
              prose-td:border-gray-200 dark:prose-td:border-gray-700
              prose-img:rounded-lg
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          {(prev || next) && (
            <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
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
                    href={`/blog/${next.slug}`}
                    className="group rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors sm:text-right"
                  >
                    <p className="flex items-center sm:justify-end gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-amber-400">
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
