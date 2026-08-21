import type { Metadata } from "next";
import { containerShell } from "../../../components/ui/Section";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function extractCodeLanguage(children: React.ReactNode): string | undefined {
  const child = Array.isArray(children) ? children[0] : children;
  if (
    child &&
    typeof child === "object" &&
    "props" in child &&
    child.props &&
    typeof (child as { props: { className?: unknown } }).props.className ===
      "string"
  ) {
    const className = (child as { props: { className: string } }).props.className;
    const match = className.match(/language-(\S+)/);
    if (match) return match[1];
  }
  return undefined;
}

const markdownComponents: Components = {
  pre: ({ children }) => {
    const language = extractCodeLanguage(children);
    return (
      <div className="not-prose my-7 overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-sm dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="block h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          {language && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {language}
            </span>
          )}
        </div>
        <pre className="m-0 overflow-x-auto p-4 sm:p-5 text-[13px] sm:text-sm leading-relaxed text-gray-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:font-mono">
          {children}
        </pre>
      </div>
    );
  },
  img: ({ alt, src, ...rest }) => {
    const url = typeof src === "string" ? src : "";
    const altText = alt ?? "";
    const isBadge = url.includes("shields.io");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...rest}
        src={url}
        alt={altText}
        loading="lazy"
        className={
          isBadge
            ? "not-prose inline-block align-middle h-5 mr-1.5 mb-1.5 rounded-sm"
            : undefined
        }
      />
    );
  },
  hr: () => (
    <div
      className="not-prose my-12 flex items-center justify-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 dark:via-amber-500/40 to-transparent" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/60 dark:via-amber-500/40 to-transparent" />
    </div>
  ),
  blockquote: ({ children }) => (
    <blockquote className="not-prose my-6 rounded-xl border-l-4 border-amber-500 bg-amber-50/70 dark:bg-amber-500/10 dark:border-amber-400 p-4 sm:p-5 [&_p]:m-0 [&_p+p]:mt-3 [&_p]:text-gray-800 dark:[&_p]:text-gray-200 [&_p]:leading-relaxed [&_strong]:text-amber-900 dark:[&_strong]:text-amber-300 [&_a]:text-amber-700 dark:[&_a]:text-amber-300 [&_a]:underline [&_a]:underline-offset-2 [&_code]:bg-amber-100 dark:[&_code]:bg-amber-500/20 [&_code]:text-amber-900 dark:[&_code]:text-amber-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.875em]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-divider">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800/60">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold text-content px-4 py-2.5 border-b border-divider first:pl-5 last:pr-5">
      {children}
    </th>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      {children}
    </tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 align-top first:pl-5 last:pr-5">
      {children}
    </td>
  ),
};
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
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-surface">
      <div className={containerShell("prose")}>
        <article className="w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to blog
          </Link>

          <header className="mb-8 sm:mb-10">
            <p className="text-sm font-medium mb-1 text-amber-700 dark:text-amber-400/80">
              Writing
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-tight leading-tight mb-4 text-content">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-base sm:text-lg leading-relaxed mb-5 text-content-muted">
                {post.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-content-subtle">
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
              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
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
              prose-h2:font-mono prose-h2:text-sm prose-h2:uppercase prose-h2:tracking-wide prose-h2:font-semibold
              prose-h2:text-amber-700 dark:prose-h2:text-amber-400
              prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-gray-900 dark:prose-h3:text-white prose-h3:font-semibold prose-h3:text-lg
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-amber-800 dark:prose-code:text-amber-300
              prose-code:bg-amber-50 dark:prose-code:bg-amber-500/10
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-code:before:content-none prose-code:after:content-none
              prose-code:font-medium prose-code:text-[0.875em]
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          {(prev || next) && (
            <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
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
                    href={`/blog/${next.slug}`}
                    className="group rounded-xl p-4 border border-divider bg-white dark:bg-gray-800/40 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-sm transition-colors sm:text-right"
                  >
                    <p className="flex items-center sm:justify-end gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide mb-1.5 text-content-subtle group-hover:text-amber-700 dark:group-hover:text-amber-400">
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
