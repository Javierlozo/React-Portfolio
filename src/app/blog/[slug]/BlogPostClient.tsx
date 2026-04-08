"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import type { BlogPost } from "../../../data/blog";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const lab = post.lab;

  return (
    <div className={`min-h-screen pt-20 pb-16 ${dark ? "bg-[#0B1220]" : "bg-gray-50"}`}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className={`inline-flex items-center gap-1 text-sm mb-8 transition-colors ${
            dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          &larr; All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <time
            dateTime={post.date}
            className={`text-xs font-medium uppercase tracking-wider ${dark ? "text-amber-400/80" : "text-amber-700"}`}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
            {post.title}
          </h1>
          <p className={`text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {post.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full ${
                  dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero screenshot */}
        {lab.screenshots && lab.screenshots.length > 0 && (
          <div className="mb-10 rounded-xl overflow-hidden border border-gray-700/50">
            <Image
              src={lab.screenshots[0].src}
              alt={lab.screenshots[0].alt ?? post.title}
              width={1200}
              height={675}
              className="w-full"
            />
            {lab.screenshots[0].caption && (
              <p className={`text-xs px-4 py-2 ${dark ? "bg-gray-800/80 text-gray-500" : "bg-gray-50 text-gray-400"}`}>
                {lab.screenshots[0].caption}
              </p>
            )}
          </div>
        )}

        {/* Why this matters - callout */}
        {lab.whyThisMatters && (
          <div className={`mb-8 p-5 rounded-xl border-l-4 ${
            dark
              ? "bg-amber-500/5 border-amber-500/50 text-amber-200/90"
              : "bg-amber-50 border-amber-400 text-amber-900"
          }`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${dark ? "text-amber-400" : "text-amber-700"}`}>
              Why This Matters
            </h2>
            <p className="leading-relaxed">{lab.whyThisMatters}</p>
          </div>
        )}

        {/* Background */}
        <Section title="Background" dark={dark}>
          <p>{lab.context}</p>
        </Section>

        {/* TL;DR - callout */}
        {lab.tldr && lab.tldr.length > 0 && (
          <div className={`mb-8 p-5 rounded-xl ${dark ? "bg-gray-800/80" : "bg-white border border-gray-200"}`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}>
              TL;DR
            </h2>
            <ul className="space-y-2">
              {lab.tldr.map((item, i) => (
                <li key={i} className={`flex items-start gap-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-amber-400" : "bg-amber-500"}`} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools */}
        <Section title="Tools Used" dark={dark}>
          <div className="flex flex-wrap gap-2">
            {lab.tools.map((tool) => (
              <span
                key={tool}
                className={`text-sm px-3 py-1 rounded-full ${
                  dark ? "bg-gray-800 text-gray-300 border border-gray-700" : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </Section>

        {/* Step-by-step analysis with inline screenshots */}
        {lab.stepDetails && lab.stepDetails.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
              Step-by-Step Analysis
            </h2>
            <div className="space-y-8">
              {lab.stepDetails.map((step, i) => (
                <div
                  key={i}
                  className={`rounded-xl border overflow-hidden ${
                    dark ? "bg-gray-800/30 border-gray-700/50" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        dark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700"
                      }`}>
                        {i + 1}
                      </span>
                      <h3 className={`font-semibold pt-0.5 ${dark ? "text-white" : "text-gray-900"}`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed mb-3 ml-10 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                      {step.description}
                    </p>
                    {step.command && (
                      <div className="ml-10">
                        <pre
                          className="text-sm p-3 rounded-lg overflow-x-auto bg-gray-950 text-green-400"
                        >
                          <code>{step.command.split("\n").map((line, j) => (
                            <span key={j}>
                              <span className="text-gray-600 select-none">$ </span>{line}{j < step.command!.split("\n").length - 1 ? "\n" : ""}
                            </span>
                          ))}</code>
                        </pre>
                        {step.commandBreakdown && (
                          <div className={`mt-2 text-xs space-y-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                            {step.commandBreakdown.split("\n").map((line, j) => {
                              const [flag, ...desc] = line.split(":");
                              return (
                                <div key={j} className="flex gap-1.5">
                                  <code className={`shrink-0 ${dark ? "text-cyan-400/70" : "text-cyan-700"}`}>{flag.trim()}</code>
                                  {desc.length > 0 && <span>{desc.join(":").trim()}</span>}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Inline screenshot for this step */}
                  {step.screenshot && (
                    <ExpandableScreenshot
                      src={step.screenshot}
                      alt={`Step ${i + 1}: ${step.title}`}
                      dark={dark}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key findings - styled list */}
        {lab.keyFindings && lab.keyFindings.length > 0 && (
          <div className={`mb-8 p-5 rounded-xl border-l-4 ${
            dark
              ? "bg-red-500/5 border-red-500/50"
              : "bg-red-50 border-red-400"
          }`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${dark ? "text-red-400" : "text-red-700"}`}>
              Key Findings
            </h2>
            <ul className="space-y-2">
              {lab.keyFindings.map((finding, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-red-400" : "bg-red-500"}`} />
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Outcome */}
        <Section title="Outcome" dark={dark}>
          <p>{lab.outcome}</p>
        </Section>

        {/* Next steps */}
        {lab.nextStepsInProduction && (
          <Section title="What I'd Do in Production" dark={dark}>
            <p>{lab.nextStepsInProduction}</p>
          </Section>
        )}

        {/* Security controls */}
        {lab.securityControlsRelevant && lab.securityControlsRelevant.length > 0 && (
          <div className={`mb-8 p-5 rounded-xl ${dark ? "bg-blue-500/5" : "bg-blue-50"}`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${dark ? "text-blue-400" : "text-blue-700"}`}>
              Relevant Security Controls
            </h2>
            <ul className="space-y-2">
              {lab.securityControlsRelevant.map((control, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-blue-400" : "bg-blue-500"}`} />
                  <span className="leading-relaxed">{control}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA to full lab */}
        <div
          className={`mt-12 p-6 rounded-xl border text-center ${
            dark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className={`text-sm mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            This post is based on a hands-on lab with screenshots and full packet analysis.
          </p>
          <Link
            href={post.labPath}
            className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors ${
              dark
                ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            View full lab writeup with screenshots &rarr;
          </Link>
        </div>

        {/* Author */}
        <div className={`mt-10 pt-8 border-t ${dark ? "border-gray-800" : "border-gray-200"}`}>
          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>
            Written by{" "}
            <Link href="/" className={dark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}>
              Luis Javier Lozoya
            </Link>
            {" "}- Full Stack Engineer focused on security, cloud, and AI.
          </p>
        </div>
      </article>
    </div>
  );
}

function ExpandableScreenshot({ src, alt, dark }: { src: string; alt: string; dark: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        onClick={() => setExpanded(true)}
        className={`w-full border-t cursor-pointer transition-opacity hover:opacity-90 ${
          dark ? "border-gray-700/50" : "border-gray-200"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full"
        />
      </button>
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer p-4"
          onClick={() => setExpanded(false)}
          onKeyDown={(e) => e.key === "Escape" && setExpanded(false)}
          role="button"
          tabIndex={0}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <span className="absolute top-4 right-4 text-white/60 text-sm">Click or press Esc to close</span>
        </div>
      )}
    </>
  );
}

function Section({
  title,
  dark,
  children,
}: {
  title: string;
  dark: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className={`text-xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      <div className={`leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
        {children}
      </div>
    </section>
  );
}
