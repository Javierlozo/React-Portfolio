"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import type { BlogPost } from "../../data/blog";
import { getBlogPostHref } from "../../data/blog";

const INITIAL_COUNT = 3;

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? posts : posts.slice(0, INITIAL_COUNT);
  const hasMore = posts.length > INITIAL_COUNT;

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <header className="mb-12 sm:mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 text-amber-700 dark:text-amber-400">
            <FontAwesomeIcon icon={faPenNib} className="mr-2" />
            Writing · {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin leading-tight tracking-tight mb-5 text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            Lab writeups and technical deep dives.
            <span className="block mt-1 text-gray-500 dark:text-gray-400">
              What I learned, written down so I&apos;ll remember it.
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => {
            const thumb =
              post.kind === "lab"
                ? post.lab.screenshots?.[0]?.src
                : post.thumbnail;
            return (
              <Link
                key={post.slug}
                href={getBlogPostHref(post)}
                className="group border rounded-xl overflow-hidden transition-colors duration-300 bg-white border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-amber-500/50 dark:hover:shadow-amber-500/5"
              >
                {thumb && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={thumb}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent dark:from-gray-900/80" />
                  </div>
                )}

                <div className="p-5">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400/80"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-lg font-semibold mt-1.5 mb-2 leading-snug transition-colors text-gray-900 group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-400">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-4 text-gray-500 dark:text-gray-400">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-500/60 dark:text-amber-400 dark:hover:bg-amber-500/10"
            >
              {showAll ? "Show less" : `Show all ${posts.length} posts`}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
