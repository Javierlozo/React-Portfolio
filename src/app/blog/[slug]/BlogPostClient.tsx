"use client";

import Link from "next/link";
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
            className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}
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

        {/* Why this matters */}
        {lab.whyThisMatters && (
          <Section title="Why This Matters" dark={dark}>
            <p>{lab.whyThisMatters}</p>
          </Section>
        )}

        {/* Context */}
        <Section title="Background" dark={dark}>
          <p>{lab.context}</p>
        </Section>

        {/* TL;DR */}
        {lab.tldr && lab.tldr.length > 0 && (
          <Section title="TL;DR" dark={dark}>
            <ul className="list-disc list-inside space-y-1">
              {lab.tldr.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
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

        {/* Step-by-step analysis */}
        {lab.stepDetails && lab.stepDetails.length > 0 && (
          <Section title="Step-by-Step Analysis" dark={dark}>
            <div className="space-y-6">
              {lab.stepDetails.map((step, i) => (
                <div key={i}>
                  <h3 className={`font-semibold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
                    {i + 1}. {step.title}
                  </h3>
                  <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    {step.description}
                  </p>
                  {step.command && (
                    <pre
                      className={`text-sm p-3 rounded-lg overflow-x-auto ${
                        dark ? "bg-gray-900 text-green-400" : "bg-gray-900 text-green-400"
                      }`}
                    >
                      <code>$ {step.command}</code>
                    </pre>
                  )}
                  {step.commandBreakdown && (
                    <p className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                      {step.commandBreakdown}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Key findings */}
        {lab.keyFindings && lab.keyFindings.length > 0 && (
          <Section title="Key Findings" dark={dark}>
            <ul className="list-disc list-inside space-y-1">
              {lab.keyFindings.map((finding, i) => (
                <li key={i}>{finding}</li>
              ))}
            </ul>
          </Section>
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
          <Section title="Relevant Security Controls" dark={dark}>
            <ul className="list-disc list-inside space-y-1">
              {lab.securityControlsRelevant.map((control, i) => (
                <li key={i}>{control}</li>
              ))}
            </ul>
          </Section>
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
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              dark
                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
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
