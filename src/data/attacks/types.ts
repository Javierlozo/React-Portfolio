export type OwaspLLMCategory =
  | "LLM01"
  | "LLM02"
  | "LLM03"
  | "LLM04"
  | "LLM05"
  | "LLM06"
  | "LLM07"
  | "LLM08"
  | "LLM09"
  | "LLM10";

export const OWASP_CATEGORY_NAMES: Record<OwaspLLMCategory, string> = {
  LLM01: "Prompt Injection",
  LLM02: "Sensitive Information Disclosure",
  LLM03: "Supply Chain",
  LLM04: "Data and Model Poisoning",
  LLM05: "Improper Output Handling",
  LLM06: "Excessive Agency",
  LLM07: "System Prompt Leakage",
  LLM08: "Vector and Embedding Weaknesses",
  LLM09: "Misinformation",
  LLM10: "Unbounded Consumption",
};

export type AttackTechnique =
  | "role-play-jailbreak"
  | "instruction-override"
  | "payload-encoding"
  | "indirect-injection"
  | "multi-turn"
  | "context-confusion"
  | "system-prompt-leak"
  | "delimiter-abuse"
  | "refusal-bypass"
  | "tool-abuse";

export type Severity = "low" | "medium" | "high" | "critical";

export type DefenseCategory =
  | "input-filter"
  | "output-filter"
  | "system-prompt-hardening"
  | "llm-judge"
  | "architectural";

export interface AttackTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AttackReference {
  title: string;
  url: string;
}

export interface AttackDefense {
  summary: string;
  category: DefenseCategory;
  snippet?: string;
  snippetLanguage?: "ts" | "js" | "python" | "regex";
}

export interface Attack {
  /** Stable slug used as filename, URL, and result-key prefix (e.g. "LLM01-instruction-override-basic"). */
  id: string;
  title: string;
  owaspCategory: OwaspLLMCategory;
  /** MITRE ATLAS technique IDs, e.g. "AML.T0051.000". Empty array if none apply. */
  atlasTechniques: string[];
  technique: AttackTechnique;
  severity: Severity;
  summary: string;
  /** Simulated vulnerable application's system prompt. The target of the attack. */
  systemPrompt: string;
  /** Single-turn adversarial input. Use `turns` instead for multi-turn attacks. */
  userPrompt?: string;
  turns?: AttackTurn[];
  /** Describes what a successful bypass looks like so a human can classify the verdict. */
  successCriteria: string;
  references: AttackReference[];
  defense: AttackDefense;
}

export type Verdict = "blocked" | "partial" | "bypassed" | "error";

export interface TestModelParams {
  temperature: number;
  maxTokens: number;
  topP?: number;
}

export interface AttackResult {
  attackId: string;
  /** AI Gateway model ID, e.g. "anthropic/claude-sonnet-4.6". */
  modelId: string;
  verdict: Verdict;
  response: string;
  /** One- or two-sentence rationale for the verdict. */
  rationale: string;
  /** ISO 8601 timestamp. */
  testedAt: string;
  params: TestModelParams;
  /** AI Gateway generation ID for later lookup via /v1/generation. */
  generationId?: string;
  costUsd?: number;
  latencyMs?: number;
}

/** Key format: `${attackId}::${modelId}`. */
export type ResultsByKey = Record<string, AttackResult>;

export interface ModelTarget {
  /** AI Gateway model ID (provider-prefixed, dot format). */
  id: string;
  label: string;
  provider: "anthropic" | "openai" | "google";
  tier: "flagship" | "budget";
}
