"use client";

import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import type { BlogPost } from "../../data/blog";

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`min-h-screen pt-20 pb-16 ${dark ? "bg-[#0B1220]" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
            Blog
          </h1>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Security lab writeups and technical deep dives.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`border rounded-xl p-6 transition-colors ${
                dark
                  ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <time
                dateTime={post.date}
                className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className={`text-xl font-semibold mt-1 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`hover:underline ${dark ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                >
                  {post.title}
                </Link>
              </h2>
              <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-0.5 rounded-full ${
                      dark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={`mt-12 pt-8 border-t text-center ${dark ? "border-gray-800" : "border-gray-200"}`}>
          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>
            More posts coming as I complete additional labs and certifications.
          </p>
        </div>
      </div>
    </div>
  );
}
