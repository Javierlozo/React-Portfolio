import React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

function extractCodeLanguage(children: React.ReactNode): string | undefined {
  const child = Array.isArray(children) ? children[0] : children;
  if (
    child &&
    typeof child === "object" &&
    "props" in child &&
    child.props &&
    typeof (child as { props: { className?: unknown } }).props.className ===
      "string"
  ) {
    const className = (child as { props: { className: string } }).props.className;
    const match = className.match(/language-(\S+)/);
    if (match) return match[1];
  }
  return undefined;
}

const components: Components = {
  pre: ({ children }) => {
    const language = extractCodeLanguage(children);
    return (
      <div className="not-prose my-7 overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-sm dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="block h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          {language && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {language}
            </span>
          )}
        </div>
        <pre className="m-0 overflow-x-auto p-4 sm:p-5 text-[13px] sm:text-sm leading-relaxed text-gray-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:font-mono">
          {children}
        </pre>
      </div>
    );
  },
  h2: ({ children }) => {
    const text = React.Children.toArray(children)
      .map((c) => (typeof c === "string" ? c : ""))
      .join("");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const text = React.Children.toArray(children)
      .map((c) => (typeof c === "string" ? c : ""))
      .join("");
    if (text.startsWith("Lab:")) {
      return (
        <h3 className="not-prose mt-12 mb-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/5 px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-amber-600 text-white shrink-0">
            Lab
          </span>
          <span className="flex-1">{text.replace(/^Lab:\s*/, "")}</span>
        </h3>
      );
    }
    return <h3>{children}</h3>;
  },
  blockquote: ({ children }) => (
    <blockquote className="not-prose my-6 rounded-xl border-l-4 border-amber-500 bg-amber-50/70 dark:bg-amber-500/10 dark:border-amber-400 p-4 sm:p-5 [&_p]:m-0 [&_p+p]:mt-3 [&_p]:text-gray-800 dark:[&_p]:text-gray-200 [&_p]:leading-relaxed [&_a]:text-amber-700 dark:[&_a]:text-amber-300 [&_a]:underline [&_a]:underline-offset-2 [&_code]:bg-amber-100 dark:[&_code]:bg-amber-500/20 [&_code]:text-amber-900 dark:[&_code]:text-amber-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.875em]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800/60">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold text-gray-900 dark:text-white px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 first:pl-5 last:pr-5">
      {children}
    </th>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      {children}
    </tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 align-top first:pl-5 last:pr-5">
      {children}
    </td>
  ),
  img: ({ src, alt, title }) => {
    if (typeof src !== "string") return null;
    return (
      <span className="not-prose my-7 block">
        <a
          href={src}
          target="_blank"
          rel="noreferrer noopener"
          className="block overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            className="block w-full h-auto"
          />
        </a>
        {title && (
          <span className="mt-2.5 block text-center text-xs text-gray-500 dark:text-gray-400 italic">
            {title}
          </span>
        )}
      </span>
    );
  },
};

export default function NoteMarkdown({ body }: { body: string }) {
  return (
    <div
      className="
        prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-24
        prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-semibold
        prose-h1:text-gray-900 dark:prose-h1:text-white prose-h1:mb-6
        prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight
        prose-h2:text-gray-900 dark:prose-h2:text-white
        prose-h2:mt-16 prose-h2:mb-5 prose-h2:pt-8
        prose-h2:border-t prose-h2:border-gray-200 dark:prose-h2:border-gray-700/70
        first:prose-h2:border-t-0 first:prose-h2:pt-0 first:prose-h2:mt-0
        prose-h3:text-amber-700 dark:prose-h3:text-amber-400 prose-h3:font-semibold
        prose-h3:text-lg sm:prose-h3:text-xl
        prose-h3:mt-10 prose-h3:mb-3
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.75] prose-p:my-5
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-amber-800 dark:prose-code:text-amber-300
        prose-code:bg-amber-50 dark:prose-code:bg-amber-500/10
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        prose-code:font-medium prose-code:text-[0.875em]
        prose-ul:my-5 prose-ol:my-5
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-2 prose-li:leading-[1.7]
        prose-li:marker:text-amber-600 dark:prose-li:marker:text-amber-500/80
        prose-hr:my-10 prose-hr:border-gray-200 dark:prose-hr:border-gray-700/60
        prose-table:text-sm
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
