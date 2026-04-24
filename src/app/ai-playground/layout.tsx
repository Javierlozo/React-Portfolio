import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "LLM Red Team Lab | Luis Javier Lozoya",
  description:
    "A reproducible red-team study of prompt-injection attacks against production LLMs. ~30 attacks mapped to OWASP LLM Top 10 and MITRE ATLAS, tested across six frontier and budget-tier models via Vercel AI Gateway. Includes working defensive mitigations.",
  keywords: [
    "LLM security",
    "prompt injection",
    "AI red team",
    "OWASP LLM Top 10",
    "MITRE ATLAS",
    "AppSec",
    "AI security",
  ],
  openGraph: {
    title: "LLM Red Team Lab",
    description:
      "Prompt injection research across Claude, GPT, and Gemini — OWASP LLM Top 10, MITRE ATLAS, reproducible evidence.",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function AiPlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
