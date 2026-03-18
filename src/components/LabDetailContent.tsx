"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
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

export default function LabDetailContent({ lab }: { lab: CybersecurityLab }) {
  const { theme } = useTheme();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt?: string; caption?: string } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { prev, next } = getAdjacentLabs(lab.id);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <article className="w-full">
        <Link
          href="/#security-labs"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 ${
            theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> See Security Labs
        </Link>

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          {lab.course && (
            <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-amber-400/80" : "text-amber-700"}`}>
              {lab.course}
            </p>
          )}
          <h1 className={`text-2xl sm:text-3xl font-medium mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {lab.title}
          </h1>
          {lab.role && (
            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>{lab.role}</p>
          )}
          {(lab.focus || lab.level || lab.date || lab.artifacts) && (
            <div
              className={`space-y-1 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {lab.focus && <p><strong className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Focus:</strong> {lab.focus}</p>}
              {lab.level && <p><strong className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Level:</strong> {lab.level}</p>}
              {lab.date && <p><strong className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Date:</strong> {lab.date}</p>}
              {lab.artifacts && <p><strong className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Artifacts:</strong> {lab.artifacts}</p>}
            </div>
          )}
        </header>

        {/* TL;DR */}
        {lab.tldr && lab.tldr.length > 0 && (
          <div
            className={`mb-10 p-4 sm:p-5 rounded-xl ${
              theme === "dark" ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
              TL;DR
            </h2>
            <ul className="space-y-1.5">
              {lab.tldr.map((line, idx) => (
                <li key={idx} className={`flex gap-2 text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills — tag pills */}
        {lab.skillsDemonstrated && lab.skillsDemonstrated.length > 0 && (
          <div className="mb-10">
            <h2 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}>
              Skills demonstrated
            </h2>
            <div className="flex flex-wrap gap-2">
              {lab.skillsDemonstrated.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    theme === "dark" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ethics / Sharing */}
        <div
          className={`mb-10 p-3 sm:p-4 rounded-lg text-sm ${
            theme === "dark" ? "bg-gray-800/60 text-gray-300 border border-gray-700" : "bg-gray-100 text-gray-600 border border-gray-200"
          }`}
        >
          <p className="flex items-start gap-2">
            <FontAwesomeIcon icon={faShieldAlt} className="mt-0.5 shrink-0 text-amber-500/80" />
            <span>
              <strong className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Note:</strong> Course-provided PCAPs and lab instructions are not shared. Only my own captures and sanitized notes are published.
            </span>
          </p>
        </div>

        {/* Why this matters: early, prominent */}
        {lab.whyThisMatters && (
          <div
            className={`mb-10 p-4 sm:p-5 rounded-xl border-l-4 ${
              theme === "dark"
                ? "bg-amber-500/10 border-amber-500/60"
                : "bg-amber-50 border-amber-500"
            }`}
          >
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              Why this matters
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}>
              {lab.whyThisMatters}
            </p>
          </div>
        )}

        {/* Context */}
        <section className="mb-10">
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
            theme === "dark" ? "text-amber-400" : "text-amber-700"
          }`}>
            <FontAwesomeIcon icon={faBullseye} />
            Context
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {lab.context}
          </p>
        </section>

        {/* Tools */}
        <section className="mb-10">
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}>
            <FontAwesomeIcon icon={faWrench} />
            Tools used
          </h2>
          <div className="flex flex-wrap gap-2">
            {lab.tools.map((tool) => (
              <span
                key={tool}
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-10">
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-4 ${
            theme === "dark" ? "text-amber-400" : "text-amber-700"
          }`}>
            <FontAwesomeIcon icon={faListCheck} />
            Steps taken
          </h2>
          {lab.stepDetails && lab.stepDetails.length > 0 ? (
            <div className="space-y-6">
              {lab.stepDetails.map((s, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 sm:p-5 space-y-3 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700/80"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <h3 className={`flex items-center gap-3 font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                        theme === "dark"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{s.description}</p>
                  {s.command && (
                    <>
                      <pre
                        className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto ${
                          theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <code>{s.command}</code>
                      </pre>
                      {s.commandBreakdown && (
                        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          <p className={`font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Flags</p>
                          <ul className="space-y-0.5 list-none">
                            {s.commandBreakdown.split("\n").map((line, i) => (
                              <li key={i}><code>{line}</code></li>
                            ))}
                          </ul>
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
                        className={`block w-full text-left relative aspect-video max-w-2xl rounded-lg overflow-hidden border cursor-zoom-in hover:opacity-90 transition-opacity ${
                          theme === "dark" ? "border-gray-600" : "border-gray-300"
                        }`}
                      >
                        <Image src={s.screenshot} alt={s.title} fill className="object-contain" />
                      </button>
                    </figure>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              {lab.steps.map((step, idx) => (
                <li key={idx} className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{step}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Key findings — highlight cards */}
        {lab.keyFindings && lab.keyFindings.length > 0 && (
          <section className="mb-10">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-4 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
              <FontAwesomeIcon icon={faSearch} />
              Key findings
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {lab.keyFindings.map((f, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-4 rounded-xl border-l-4 text-sm leading-relaxed ${
                    theme === "dark"
                      ? "bg-amber-500/10 border-amber-500/50 text-gray-200"
                      : "bg-amber-50 border-amber-400 text-gray-800"
                  }`}
                >
                  {f}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Outcome */}
        <section className="mb-10">
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
            theme === "dark" ? "text-amber-400" : "text-amber-700"
          }`}>
            <FontAwesomeIcon icon={faLightbulb} />
            Outcome / Lessons learned
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {lab.outcome}
          </p>
          {lab.nextStepsInProduction && (
            <p className={`text-sm sm:text-base leading-relaxed italic mb-4 ${theme === "dark" ? "text-amber-200/90" : "text-amber-900/90"}`}>
              {lab.nextStepsInProduction}
            </p>
          )}
        </section>

        {/* Security controls relevant */}
        {lab.securityControlsRelevant && lab.securityControlsRelevant.length > 0 && (
          <section className="mb-10">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
              Security controls relevant
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {lab.securityControlsRelevant.map((control, idx) => (
                <li key={idx} className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{control}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Report link */}
        {lab.reportDownloadLink && (
          <section className="mb-10">
            <a
              href={lab.reportDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border transition-all ${
                theme === "dark"
                  ? "border-amber-500/60 text-amber-400 hover:bg-amber-500/10"
                  : "border-amber-600 text-amber-700 hover:bg-amber-50"
              }`}
            >
              <FontAwesomeIcon icon={faDownload} />
              {lab.reportDownloadLabel ?? "Download report"}
            </a>
          </section>
        )}

        {/* Screenshot thumbnail strip */}
        {lab.screenshots && lab.screenshots.length > 0 && (
          <section className="mb-10">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-4 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
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
                  className={`relative aspect-video rounded-lg overflow-hidden border cursor-zoom-in hover:opacity-80 transition-opacity ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <Image src={shot.src} alt={shot.alt ?? `Screenshot ${idx + 1}`} fill className="object-cover" />
                  <span
                    className={`absolute bottom-0 left-0 right-0 text-[10px] text-center py-0.5 font-medium ${
                      theme === "dark" ? "bg-black/70 text-gray-300" : "bg-black/50 text-white"
                    }`}
                  >
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Next / Previous lab navigation */}
        {(prev || next) && (
          <nav
            className={`mt-12 pt-8 border-t flex items-stretch gap-4 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            } ${prev && next ? "justify-between" : next ? "justify-end" : "justify-start"}`}
          >
            {prev && (
              <Link
                href={getLabPath(prev)}
                className={`group flex flex-col gap-1 text-left max-w-[45%] ${
                  theme === "dark" ? "text-gray-400 hover:text-amber-400" : "text-gray-500 hover:text-amber-700"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-medium flex items-center gap-1">
                  <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" /> Previous lab
                </span>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-amber-300" : "text-gray-800 group-hover:text-amber-800"}`}>
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={getLabPath(next)}
                className={`group flex flex-col gap-1 text-right max-w-[45%] ml-auto ${
                  theme === "dark" ? "text-gray-400 hover:text-amber-400" : "text-gray-500 hover:text-amber-700"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-medium flex items-center gap-1 justify-end">
                  Next lab <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                </span>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-amber-300" : "text-gray-800 group-hover:text-amber-800"}`}>
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

      {/* Back to top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
            theme === "dark"
              ? "bg-amber-500/90 text-gray-900 hover:bg-amber-400"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}
