import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

export default async function BlogPostPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;
  const post = getStandalonePost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
        <nav className="mb-6">
          <Link
            href="/blog"
            className="text-sm text-amber-700 hover:underline dark:text-amber-400"
          >
            &larr; Back to blog
          </Link>
        </nav>

        <header className="mb-10">
          <time
            dateTime={post.date}
            className="text-xs font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400/80"
          >
            {formattedDate}
          </time>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-pre:bg-gray-900 prose-pre:text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
