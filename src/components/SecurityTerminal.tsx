"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

type Line = {
  prompt: string;
  command: string;
  output?: string;
  tag: string;
};

const LINES: Line[] = [
  {
    prompt: "luis@sec401",
    command: "tcpdump -n -r investigate.pcap -c 20",
    output: "→ GET /.env  HTTP/1.1  404  (probing)",
    tag: "Network Forensics",
  },
  {
    prompt: "luis@sec401",
    command: "nmap -sV -Pn 10.0.0.0/24",
    output: "→ 22/tcp ssh 2222/tcp ssh (non-standard)",
    tag: "Network Security",
  },
  {
    prompt: "luis@sec401",
    command: "hashcat -m 1000 ntlm.hash rockyou.txt",
    output: "→ Recovered: 1/1  Time: 00:00:03",
    tag: "Cryptography",
  },
  {
    prompt: "luis@sec401",
    command: "ausearch -k recon -i",
    output: "→ 7 events · reverse shell decoded",
    tag: "Linux Auditing",
  },
  {
    prompt: "luis@sec401",
    command: "secedit /analyze /db alpha.sdb /cfg basic.inf",
    output: "→ Mismatch: 12 · drift remediated",
    tag: "Windows Hardening",
  },
  {
    prompt: "luis@sec401",
    command: "zeek -r traffic.pcap local",
    output: "→ conn.log dns.log http.log files.log",
    tag: "Intrusion Detection",
  },
];

const TYPE_SPEED = 28;
const HOLD_AFTER = 1800;

export default function SecurityTerminal() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const line = LINES[i];

  useEffect(() => {
    if (reduce) {
      setTyped(line.command);
      setShowOutput(true);
      return;
    }

    setTyped("");
    setShowOutput(false);

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    let pos = 0;
    const typeStep = () => {
      pos += 1;
      setTyped(line.command.slice(0, pos));
      if (pos < line.command.length) {
        schedule(typeStep, TYPE_SPEED);
      } else {
        schedule(() => setShowOutput(true), 180);
        schedule(() => setI((v) => (v + 1) % LINES.length), HOLD_AFTER);
      }
    };
    schedule(typeStep, 260);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [i, line.command, reduce]);

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className={`w-full max-w-sm rounded-lg border overflow-hidden font-mono text-[11px] sm:text-xs shadow-xl ${
        isDark
          ? "bg-gray-950/80 border-gray-800 backdrop-blur"
          : "bg-gray-900 border-gray-800"
      }`}
      aria-label="Security lab command loop"
    >
      <div
        className={`flex items-center gap-1.5 px-3 py-2 border-b ${
          isDark ? "border-gray-800 bg-gray-900/60" : "border-gray-800 bg-gray-800"
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[10px] text-gray-400 tracking-wide">
          ~/gsec-labs &mdash; zsh
        </span>
      </div>

      <div className="px-3 py-3 min-h-[92px] text-gray-100">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-emerald-400">{line.prompt}</span>
          <span className="text-gray-500">$</span>
          <span className="text-gray-100 break-all">
            {typed}
            <motion.span
              aria-hidden
              className="inline-block w-[7px] h-[1em] align-[-2px] ml-[1px] bg-gray-100"
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </div>

        <AnimatePresence mode="wait">
          {showOutput && line.output && (
            <motion.div
              key={line.command}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1 text-gray-400"
            >
              {line.output}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`flex items-center justify-between px-3 py-1.5 border-t text-[10px] tracking-widest uppercase ${
          isDark
            ? "border-gray-800 bg-gray-900/40 text-gray-500"
            : "border-gray-800 bg-gray-800/80 text-gray-400"
        }`}
      >
        <span>Lab {i + 1} / {LINES.length}</span>
        <span className="text-emerald-400/80">{line.tag}</span>
      </div>
    </motion.div>
  );
}
