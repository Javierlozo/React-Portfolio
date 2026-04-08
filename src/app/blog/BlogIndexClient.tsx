"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";
import type { BlogPost } from "../../data/blog";

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`min-h-screen pt-20 pb-16 ${dark ? "bg-[#0B1220]" : "bg-gray-50"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
            Blog
          </h1>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Security lab writeups and technical deep dives.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const thumb = post.lab.screenshots?.[0]?.src;
            return (
              <Link
                key={post.slug}
                href={post.labPath}
                className={`group border rounded-xl overflow-hidden transition-all duration-300 ${
                  dark
                    ? "bg-gray-800/50 border-gray-700 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5"
                    : "bg-white border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100"
                }`}
              >
                {/* Thumbnail */}
                {thumb && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={thumb}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${dark ? "bg-gradient-to-t from-gray-900/80 to-transparent" : "bg-gradient-to-t from-white/60 to-transparent"}`} />
                  </div>
                )}

                <div className="p-5">
                  <time
                    dateTime={post.date}
                    className={`text-xs font-medium uppercase tracking-wider ${dark ? "text-amber-400/80" : "text-amber-700"}`}
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className={`text-lg font-semibold mt-1.5 mb-2 leading-snug transition-colors ${
                    dark ? "text-white group-hover:text-amber-400" : "text-gray-900 group-hover:text-amber-700"
                  }`}>
                    {post.title}
                  </h2>
                  <p className={`text-sm leading-relaxed line-clamp-3 mb-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          dark
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-100 text-gray-500"
                        }`}
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

        <div className={`mt-12 pt-8 border-t text-center ${dark ? "border-gray-800" : "border-gray-200"}`}>
          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>
            More posts coming as I complete additional labs and certifications.
          </p>
        </div>
      </div>
    </div>
  );
}
