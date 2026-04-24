import Link from "next/link";
import { ATTACKS } from "@/src/data/attacks";
import { MODELS } from "@/src/data/models";
import { OWASP_CATEGORY_NAMES } from "@/src/data/attacks/types";

export default function AiPlaygroundPage() {
  const categoryCoverage = new Set(ATTACKS.map((a) => a.owaspCategory)).size;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400/80">
          / ai-playground &mdash; llm red team lab
        </div>

        <h1 className="mt-6 text-3xl font-semibold leading-tight text-gray-50 sm:text-4xl md:text-5xl">
          Prompt injection research <br className="hidden sm:inline" />
          against production LLMs.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          A reproducible red-team study of prompt-injection techniques mapped to the
          OWASP LLM Top 10 and MITRE ATLAS, tested across frontier and budget-tier
          models via Vercel AI Gateway. Each attack ships with a defensive mitigation
          and every result is reproducible from a pinned model ID and the prompt
          committed to source.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs text-gray-500 sm:grid-cols-4">
          <Stat label="attacks" value={ATTACKS.length} />
          <Stat label="owasp categories" value={`${categoryCoverage} / 10`} />
          <Stat label="models evaluated" value={MODELS.length} />
          <Stat label="status" value="week 1 / scaffold" accent />
        </dl>

        <div className="mt-12 rounded border border-gray-800 bg-gray-900/60 p-6 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-2 text-emerald-400/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="uppercase tracking-widest">lab notebook</span>
          </div>
          <p className="mt-3 text-gray-400">
            Seed attacks cover {categoryCoverage} of 10 OWASP categories. The matrix UI,
            filters, slide-over transcripts, and the live sandbox land in weeks 2-4.
            Full scope: <Link href="/docs/strategy/llm-redteam-brief.md" className="text-emerald-400 hover:underline">llm-redteam-brief</Link>.
          </p>
        </div>

        <div className="mt-10 space-y-3 font-mono text-xs">
          <div className="uppercase tracking-[0.2em] text-gray-500">seeded attacks</div>
          <ul className="space-y-2">
            {ATTACKS.map((a) => (
              <li key={a.id} className="rounded border border-gray-800 bg-gray-900/40 px-4 py-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-400">
                    {a.owaspCategory}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">
                    {OWASP_CATEGORY_NAMES[a.owaspCategory]}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-100">{a.title}</div>
                <div className="mt-1 text-[11px] text-gray-500">
                  {a.technique} &nbsp;&middot;&nbsp; {a.severity} &nbsp;&middot;&nbsp; {a.atlasTechniques.join(", ") || "no ATLAS mapping"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div>
      <dt className="uppercase tracking-[0.2em] text-gray-500">{label}</dt>
      <dd className={`mt-1 text-xl ${accent ? "text-emerald-400" : "text-gray-100"}`}>{value}</dd>
    </div>
  );
}
