"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "../app/llm-audit/icons";

const COMMAND = "npx llm-audit demo";

// Real output from `npx llm-audit demo`, trimmed. Keep in sync with the CLI.
const OUTPUT = [
  "test/fixtures/llm-output-insecure-handling/vulnerable.tsx  6 findings",
  "",
  "  ✗ error   llm-output-insecure-handling  LLM10  line 18",
  "      LLM model output is flowing into a dangerous sink (eval /",
  "      new Function / child_process / dangerouslySetInnerHTML).",
  "",
  "     17 │   // ruleid: llm-output-insecure-handling",
  "     18 │   return eval(r.choices[0].message.content as string);",
  "     19 │ }",
  "     ...",
  "────────────────────────────────────────────────────────────",
  "42 findings  31 error · 11 warning  in 12 files · 12 of 12 rules fired",
];

const TYPE_SPEED = 45;
const LINE_SPEED = 110;

function lineClass(line: string) {
  if (line.includes("✗ error")) return "text-red-400 font-semibold";
  if (line.includes("eval(")) return "text-amber-300";
  if (/^\s+(\d+ │|\.\.\.)/.test(line)) return "text-gray-500";
  if (line.startsWith("──")) return "text-gray-600";
  if (line.startsWith("test/")) return "text-gray-300 font-semibold";
  if (/^\d+ findings/.test(line)) return "text-gray-100 font-semibold";
  return "text-gray-400";
}

export default function LlmAuditTerminalDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const done = typed === COMMAND.length && shown === OUTPUT.length;

  useEffect(() => {
    if (reduce) {
      setTyped(COMMAND.length);
      setShown(OUTPUT.length);
      return;
    }
    if (!inView) return;

    setTyped(0);
    setShown(0);

    const schedule = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    let t = 400;
    for (let c = 1; c <= COMMAND.length; c++) {
      schedule(() => setTyped(c), t);
      t += TYPE_SPEED;
    }
    t += 500;
    for (let l = 1; l <= OUTPUT.length; l++) {
      schedule(() => setShown(l), t);
      // Pause before the summary line, like the scan finishing.
      t += l === OUTPUT.length - 2 ? 600 : LINE_SPEED;
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [inView, reduce, run]);

  const cursor = (
    <motion.span
      aria-hidden
      className="inline-block w-[7px] h-[1em] align-[-2px] ml-[1px] bg-gray-100"
      animate={reduce ? undefined : { opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  return (
    <div
      ref={ref}
      className="mt-6 overflow-hidden rounded-xl border border-gray-300 bg-gray-950 shadow-md dark:border-gray-700 max-w-2xl"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTerminal} className="text-gray-400 text-xs" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-300">
            {COMMAND}
          </span>
        </div>
        {done && !reduce ? (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-amber-300 transition-colors"
          >
            replay
          </button>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            output
          </span>
        )}
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-[11px] sm:text-[12px] leading-relaxed text-gray-100 font-mono">
        <code>
          <span className="block">
            <span className="text-emerald-400">$</span>{" "}
            {COMMAND.slice(0, typed)}
            {typed < COMMAND.length && cursor}
          </span>
          {/* All lines stay in the DOM so height is stable and the full
              output is readable to crawlers and screen readers. */}
          {OUTPUT.map((line, idx) => (
            <span
              key={idx}
              className={`block transition-opacity duration-150 ${lineClass(line)} ${
                idx < shown ? "opacity-100" : "opacity-0"
              }`}
            >
              {line || " "}
            </span>
          ))}
          {done && (
            <span className="block">
              <span className="text-emerald-400">$</span> {cursor}
            </span>
          )}
        </code>
      </pre>
    </div>
  );
}
