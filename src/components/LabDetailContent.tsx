"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faListCheck,
  faLightbulb,
  faDownload,
  faBullseye,
  faArrowLeft,
  faArrowRight,
  faExclamationTriangle,
  faShieldAlt,
  faChevronUp,
  faSearch,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import ImageLightbox from "./ImageLightbox";
import type { CybersecurityLab } from "../data/labs";
import { LABS, getLabPath } from "../data/labs";

function getAdjacentLabs(currentId: number) {
  const published = LABS.filter((l) => !l.comingSoon);
  const idx = published.findIndex((l) => l.id === currentId);
  return {
    prev: idx > 0 ? published[idx - 1] : null,
    next: idx < published.length - 1 ? published[idx + 1] : null,
  };
}

const sectionHeading =
  "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400";

const bodyText = "text-gray-600 dark:text-gray-300";

const card =
  "rounded-xl bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/80";

export default function LabDetailContent({ lab }: { lab: CybersecurityLab }) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt?: string; caption?: string } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { prev, next } = getAdjacentLabs(lab.id);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <article className="w-full">
          <Link
            href="/#security-labs"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> See Security Labs
          </Link>

          <header className="mb-8 sm:mb-10">
            {lab.course && (
              <p className="text-sm font-medium mb-1 text-amber-700 dark:text-amber-400/80">
                {lab.course}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-medium mb-4 text-gray-900 dark:text-white">
              {lab.title}
            </h1>
            {lab.role && (
              <p className="text-sm mb-4 text-gray-500 dark:text-gray-300">{lab.role}</p>
            )}
            <div className="mb-4">
              <Link
                href={`${getLabPath(lab)}/print`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30 dark:border-amber-500/30"
              >
                Print command sheet
              </Link>
            </div>
            {(lab.focus || lab.level || lab.date || lab.artifacts) && (
              <div className="space-y-1 text-sm text-gray-500 dark:text-gray-300">
                {lab.focus && <p><strong className="text-gray-600 dark:text-gray-300">Focus:</strong> {lab.focus}</p>}
                {lab.level && <p><strong className="text-gray-600 dark:text-gray-300">Level:</strong> {lab.level}</p>}
                {lab.date && <p><strong className="text-gray-600 dark:text-gray-300">Date:</strong> {lab.date}</p>}
                {lab.artifacts && <p><strong className="text-gray-600 dark:text-gray-300">Artifacts:</strong> {lab.artifacts}</p>}
              </div>
            )}
          </header>

          {lab.tldr && lab.tldr.length > 0 && (
            <div className="mb-10 p-4 sm:p-5 rounded-xl bg-white border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-amber-700 dark:text-amber-400">
                TL;DR
              </h2>
              <ul className="space-y-1.5">
                {lab.tldr.map((line, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-amber-500 shrink-0">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lab.skillsDemonstrated && lab.skillsDemonstrated.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 text-amber-700 dark:text-amber-400">
                Skills demonstrated
              </h2>
              <div className="flex flex-wrap gap-2">
                {lab.skillsDemonstrated.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-10 p-3 sm:p-4 rounded-lg text-sm bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700">
            <p className="flex items-start gap-2">
              <FontAwesomeIcon icon={faShieldAlt} className="mt-0.5 shrink-0 text-amber-500/80" />
              <span>
                <strong className="text-gray-700 dark:text-gray-200">Note:</strong> Course-provided PCAPs and lab instructions are not shared. Only my own captures and sanitized notes are published.
              </span>
            </p>
          </div>

          {lab.whyThisMatters && (
            <div className="mb-10 p-4 sm:p-5 rounded-xl border-l-4 bg-amber-50 border-amber-500 dark:bg-amber-500/10 dark:border-amber-500/60">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 text-amber-700 dark:text-amber-400">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                Why this matters
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-200">
                {lab.whyThisMatters}
              </p>
            </div>
          )}

          <section className="mb-10">
            <h2 className={`${sectionHeading} mb-3`}>
              <FontAwesomeIcon icon={faBullseye} />
              Context
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${bodyText}`}>
              {lab.context}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 text-gray-500 dark:text-gray-300">
              <FontAwesomeIcon icon={faWrench} />
              Tools used
            </h2>
            <div className="flex flex-wrap gap-2">
              {lab.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className={`${sectionHeading} mb-4`}>
              <FontAwesomeIcon icon={faListCheck} />
              Steps taken
            </h2>
            {lab.stepDetails && lab.stepDetails.length > 0 ? (
              <div className="space-y-6">
                {lab.stepDetails.map((s, idx) => (
                  <div key={idx} className={`${card} p-4 sm:p-5 space-y-3`}>
                    <h3 className="flex items-center gap-3 font-medium text-gray-900 dark:text-white">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40">
                        {idx + 1}
                      </span>
                      {s.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${bodyText}`}>{s.description}</p>
                    {s.command && (
                      <>
                        <pre className="p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto bg-gray-950 text-green-400">
                          <code>{s.command.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              <span className="text-gray-600 select-none">$ </span>{line}{i < s.command!.split("\n").length - 1 ? "\n" : ""}
                            </React.Fragment>
                          ))}</code>
                        </pre>
                        {s.commandBreakdown && (
                          <div className="text-xs mt-2 space-y-0.5 text-gray-400 dark:text-gray-500">
                            {s.commandBreakdown.split("\n").map((line, i) => {
                              const [flag, ...desc] = line.split(":");
                              return (
                                <div key={i} className="flex gap-1.5">
                                  <code className="shrink-0 font-medium text-cyan-700 dark:text-cyan-400/70">{flag.trim()}</code>
                                  {desc.length > 0 && <span>{desc.join(":").trim()}</span>}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                    {s.screenshot && (
                      <figure>
                        <button
                          type="button"
                          onClick={() => setLightboxImage({ src: s.screenshot!, alt: s.title, caption: s.command ?? s.title })}
                          title="Click to enlarge"
                          className="block w-full text-left relative aspect-video max-w-2xl rounded-lg overflow-hidden border cursor-zoom-in hover:opacity-90 transition-opacity border-gray-300 dark:border-gray-600"
                        >
                          <Image src={s.screenshot} alt={s.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 672px" className="object-contain" />
                        </button>
                      </figure>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1.5 text-sm">
                {lab.steps.map((step, idx) => (
                  <li key={idx} className={bodyText}>{step}</li>
                ))}
              </ul>
            )}
          </section>

          {lab.keyFindings && lab.keyFindings.length > 0 && (
            <section className="mb-10">
              <h2 className={`${sectionHeading} mb-4`}>
                <FontAwesomeIcon icon={faSearch} />
                Key findings
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {lab.keyFindings.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl border-l-4 text-sm leading-relaxed bg-amber-50 border-amber-400 text-gray-800 dark:bg-amber-500/10 dark:border-amber-500/50 dark:text-gray-200"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10">
            <h2 className={`${sectionHeading} mb-3`}>
              <FontAwesomeIcon icon={faLightbulb} />
              Outcome / Lessons learned
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed mb-4 ${bodyText}`}>
              {lab.outcome}
            </p>
            {lab.nextStepsInProduction && (
              <p className="text-sm sm:text-base leading-relaxed italic mb-4 text-amber-900/90 dark:text-amber-200/90">
                {lab.nextStepsInProduction}
              </p>
            )}
          </section>

          {lab.securityControlsRelevant && lab.securityControlsRelevant.length > 0 && (
            <section className="mb-10 p-4 sm:p-5 rounded-xl bg-blue-50 dark:bg-blue-500/5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 text-blue-700 dark:text-blue-400">
                <FontAwesomeIcon icon={faShieldAlt} />
                Security controls relevant
              </h2>
              <ul className="space-y-2">
                {lab.securityControlsRelevant.map((control, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-sm ${bodyText}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-blue-500 dark:bg-blue-400" />
                    <span className="leading-relaxed">{control}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {lab.takeaway && lab.takeaway.length > 0 && (
            <section className="mb-10 p-5 sm:p-6 rounded-xl border-l-4 bg-amber-50/50 border-amber-500 dark:bg-gray-800/50 dark:border-amber-500/60">
              <h2 className={`${sectionHeading} mb-4`}>
                <FontAwesomeIcon icon={faLightbulb} />
                What I took away from this
              </h2>
              <div className="space-y-4">
                {lab.takeaway.map((paragraph, idx) => (
                  <p key={idx} className={`text-sm sm:text-base leading-relaxed ${bodyText}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {lab.reportDownloadLink && (
            <section className="mb-10">
              <a
                href={lab.reportDownloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border transition-colors border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-500/60 dark:text-amber-400 dark:hover:bg-amber-500/10"
              >
                <FontAwesomeIcon icon={faDownload} />
                {lab.reportDownloadLabel ?? "Download report"}
              </a>
            </section>
          )}

          {lab.screenshots && lab.screenshots.length > 0 && (
            <section className="mb-10">
              <h2 className={`${sectionHeading} mb-4`}>
                <FontAwesomeIcon icon={faImages} />
                Evidence gallery
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {lab.screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxImage({ src: shot.src, alt: shot.alt, caption: shot.caption })}
                    title={shot.alt ?? `Screenshot ${idx + 1}`}
                    className="relative aspect-video rounded-lg overflow-hidden border cursor-zoom-in hover:opacity-80 transition-opacity border-gray-300 dark:border-gray-700"
                  >
                    <Image src={shot.src} alt={shot.alt ?? `Screenshot ${idx + 1}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
                    <span className="absolute bottom-0 left-0 right-0 text-[10px] text-center py-0.5 font-medium bg-black/50 text-white dark:bg-black/70 dark:text-gray-300">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {(prev || next) && (
            <nav
              className={`mt-12 pt-8 border-t flex items-stretch gap-4 border-gray-200 dark:border-gray-700 ${
                prev && next ? "justify-between" : next ? "justify-end" : "justify-start"
              }`}
            >
              {prev && (
                <Link
                  href={getLabPath(prev)}
                  className="group flex flex-col gap-1 text-left max-w-[45%] text-gray-500 hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
                >
                  <span className="text-xs uppercase tracking-wider font-medium flex items-center gap-1">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" /> Previous lab
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-amber-800 dark:text-gray-200 dark:group-hover:text-amber-300">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={getLabPath(next)}
                  className="group flex flex-col gap-1 text-right max-w-[45%] ml-auto text-gray-500 hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
                >
                  <span className="text-xs uppercase tracking-wider font-medium flex items-center gap-1 justify-end">
                    Next lab <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-amber-800 dark:text-gray-200 dark:group-hover:text-amber-300">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>

        <ImageLightbox
          src={lightboxImage?.src ?? ""}
          alt={lightboxImage?.alt}
          caption={lightboxImage?.caption}
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500/90 dark:text-gray-900 dark:hover:bg-amber-400"
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}
