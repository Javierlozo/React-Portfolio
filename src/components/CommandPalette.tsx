"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFocusTrap } from "../hooks/useFocusTrap";
import type { SearchDoc } from "../lib/search-index";

type Kind = "section" | "page" | "lab" | "writing" | "note";

type Item = {
  id: string;
  label: string;
  kind: Kind;
  hint?: string;
  terms?: string[];
  action: () => void;
};

const FILTERS: { key: Kind | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "lab", label: "Labs" },
  { key: "writing", label: "Writing" },
  { key: "note", label: "Notes" },
  { key: "page", label: "Pages" },
];

const KIND_BADGE: Record<Kind, string> = {
  lab: "bg-amber-500/10 text-amber-500",
  writing: "bg-violet-500/10 text-violet-400",
  note: "bg-sky-500/10 text-sky-400",
  page: "bg-sky-500/10 text-sky-400",
  section: "bg-emerald-500/10 text-emerald-400",
};

/** Lets any component open the palette: window.dispatchEvent(new Event(OPEN_EVENT)) */
export const OPEN_EVENT = "open-command-palette";

export default function CommandPalette({ docs = [] }: { docs?: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<Kind | "all">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useFocusTrap(dialogRef, open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isToggle = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setFilter("all");
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (prevFocusRef.current) {
      prevFocusRef.current.focus();
      prevFocusRef.current = null;
    }
  }, [open]);

  const scrollTo = (id: string) => () => {
    setOpen(false);
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goto = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };

  const items: Item[] = useMemo(() => {
    const sections: Item[] = [
      { id: "hero", label: "Top", kind: "section", hint: "↵ scroll", action: scrollTo("hero") },
      { id: "about", label: "About", kind: "section", hint: "↵ scroll", action: scrollTo("about") },
      { id: "security-labs", label: "Security Labs", kind: "section", hint: "↵ scroll", action: scrollTo("security-labs") },
      { id: "portfolio", label: "Portfolio", kind: "section", hint: "↵ scroll", action: scrollTo("portfolio") },
      { id: "contact", label: "Contact", kind: "section", hint: "↵ scroll", action: scrollTo("contact") },
      { id: "blog", label: "Blog", kind: "page", hint: "↵ open", action: goto("/blog") },
      { id: "notes", label: "AppSec Notes", kind: "page", hint: "↵ open", action: goto("/notes") },
      { id: "llm-audit-page", label: "llm-audit", kind: "page", hint: "↵ open", action: goto("/llm-audit") },
      { id: "ai-playground", label: "LLM Red Team Lab", kind: "page", hint: "↵ open", action: goto("/ai-playground") },
      { id: "now", label: "Now", kind: "page", hint: "↵ open", action: goto("/now") },
      { id: "cheatsheet", label: "GSEC Cheatsheet", kind: "page", hint: "↵ open", action: goto("/labs/cheatsheet") },
      { id: "resume", label: "Download Resume", kind: "page", hint: "↵ open", action: () => {
        setOpen(false);
        window.open("/resume/Resume.pdf", "_blank");
      }},
    ];

    const docItems: Item[] = docs.map((d) => ({
      id: d.id,
      label: d.label,
      kind: d.kind,
      hint: d.hint,
      terms: d.terms,
      action: goto(d.href),
    }));

    const all = [...sections, ...docItems];
    const scoped = filter === "all" ? all : all.filter((it) => it.kind === filter);
    const q = query.trim().toLowerCase();
    if (!q) return scoped;
    return scoped.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.hint?.toLowerCase().includes(q) ?? false) ||
        (it.terms?.some((t) => t.toLowerCase().includes(q)) ?? false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter, docs]);

  useEffect(() => {
    if (active >= items.length) setActive(0);
  }, [items.length, active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(items.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[active]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-modal flex items-start justify-center pt-[14vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-xl overflow-hidden border shadow-2xl bg-white/95 border-gray-200 text-gray-900 dark:bg-gray-900/95 dark:border-gray-800 dark:text-gray-100"
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={onInputKey}
                placeholder="Search labs, writing, notes, pages…"
                className="w-full bg-transparent outline-none text-sm placeholder:opacity-50 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => { setFilter(f.key); setActive(0); inputRef.current?.focus(); }}
                  aria-pressed={filter === f.key}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                    filter === f.key
                      ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                      : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-1" role="listbox">
              {items.length === 0 && (
                <li className="px-4 py-6 text-center text-sm opacity-60">No matches</li>
              )}
              {items.map((it, i) => {
                const activeItem = i === active;
                return (
                  <li
                    key={it.id}
                    role="option"
                    aria-selected={activeItem}
                    onMouseEnter={() => setActive(i)}
                    onClick={it.action}
                    className={`flex items-center justify-between gap-3 px-4 py-2 text-sm cursor-pointer ${
                      activeItem ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0 ${KIND_BADGE[it.kind]}`}>
                        {it.kind}
                      </span>
                      <span className="truncate">{it.label}</span>
                    </span>
                    <span className="text-[11px] opacity-50 whitespace-nowrap">{it.hint}</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between px-4 py-2 text-[10px] border-t border-gray-200 text-gray-400 dark:border-gray-800 dark:text-gray-500">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
