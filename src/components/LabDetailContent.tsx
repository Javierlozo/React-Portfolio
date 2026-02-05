"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faListCheck,
  faLightbulb,
  faDownload,
  faBullseye,
  faArrowLeft,
  faExclamationTriangle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import ImageLightbox from "./ImageLightbox";
import type { CybersecurityLab } from "../data/labs";

export default function LabDetailContent({ lab }: { lab: CybersecurityLab }) {
  const { theme } = useTheme();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt?: string; caption?: string } | null>(null);

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
        <article className="w-full">
        <a
          href="/#security-labs"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 ${
            theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> See Security Labs
        </a>

        {/* Header */}
        <header className="mb-10">
          {lab.course && (
            <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-amber-400/80" : "text-amber-700"}`}>
              {lab.course}
            </p>
          )}
          <h1 className={`text-2xl sm:text-3xl font-medium mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {lab.title}
          </h1>
          {lab.role && (
            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{lab.role}</p>
          )}
          {(lab.focus || lab.level || lab.date || lab.artifacts) && (
            <div
              className={`space-y-1 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
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

        {lab.skillsDemonstrated && (
          <p className={`mb-10 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <strong className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Skills demonstrated:</strong> {lab.skillsDemonstrated}
          </p>
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
            theme === "dark" ? "text-gray-400" : "text-gray-500"
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
            <div className="space-y-8">
              {lab.stepDetails.map((s, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {idx + 1}. {s.title}
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{s.description}</p>
                  {s.command && (
                    <>
                      <pre
                        className={`p-4 rounded-lg text-xs sm:text-sm overflow-x-auto ${
                          theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <code>{s.command}</code>
                      </pre>
                      {s.commandBreakdown && (
                        <div className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                          <p className={`font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Flags</p>
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

        {/* Key findings */}
        {lab.keyFindings && lab.keyFindings.length > 0 && (
          <section className="mb-10">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}>
              Key findings
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {lab.keyFindings.map((f, idx) => (
                <li key={idx} className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{f}</li>
              ))}
            </ul>
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
            <p className={`text-sm sm:text-base leading-relaxed italic ${theme === "dark" ? "text-amber-200/90" : "text-amber-900/90"}`}>
              {lab.nextStepsInProduction}
            </p>
          )}
        </section>

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

        </article>

        <ImageLightbox
          src={lightboxImage?.src ?? ""}
          alt={lightboxImage?.alt}
          caption={lightboxImage?.caption}
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      </div>
    </div>
  );
}
