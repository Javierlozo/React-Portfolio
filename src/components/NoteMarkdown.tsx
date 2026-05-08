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
};

export default function NoteMarkdown({ body }: { body: string }) {
  return (
    <div
      className="
        prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-24
        prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-semibold
        prose-h1:text-gray-900 dark:prose-h1:text-white prose-h1:mb-6
        prose-h2:font-mono prose-h2:text-sm prose-h2:uppercase prose-h2:tracking-wide prose-h2:font-semibold
        prose-h2:text-amber-700 dark:prose-h2:text-amber-400
        prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-gray-900 dark:prose-h3:text-white prose-h3:font-semibold prose-h3:text-lg
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-amber-800 dark:prose-code:text-amber-300
        prose-code:bg-amber-50 dark:prose-code:bg-amber-500/10
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        prose-code:font-medium prose-code:text-[0.875em]
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-table:text-sm
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
