"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NOTES_REPOS } from "../data/notes";

export default function NotesTeaser() {
  const activeRepos = NOTES_REPOS.filter((r) => r.status === "in-progress");

  return (
    <section
      id="appsec-notes"
      className="py-12 sm:py-16 bg-surface"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700/70 bg-white dark:bg-gray-800/40 p-6 sm:p-8 md:p-10">
          <div className="flex items-start gap-4 mb-5">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 shrink-0">
              <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-amber-700 dark:text-amber-400">
                Learning in public
              </p>
              <h2 className="text-2xl sm:text-3xl font-thin leading-tight text-content">
                AppSec Notes
              </h2>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300 max-w-3xl">
            I keep public notes from every security course I work through.
            Currently {activeRepos.length} active, more coming. Plain markdown,
            my own words, on GitHub.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {activeRepos.map((repo) => (
              <div
                key={repo.slug}
                className="rounded-lg border border-divider bg-gray-50 dark:bg-gray-800/60 p-3 flex items-center gap-3"
              >
                <Image
                  src={repo.logoUrl}
                  alt={`${repo.name} badge`}
                  width={56}
                  height={56}
                  className="shrink-0 w-14 h-14 rounded-md object-contain"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-content truncate">
                    {repo.name}
                  </p>
                  <p className="text-xs text-content-subtle truncate">
                    {repo.cert}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 dark:hover:bg-white"
            >
              Browse all notes
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
