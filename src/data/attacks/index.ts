import type { Attack } from "./types";
import { attack as llm01InstructionOverrideBasic } from "./LLM01-instruction-override-basic";
import { attack as llm02PiiExfilStorytelling } from "./LLM02-pii-exfiltration-via-storytelling";
import { attack as llm07PromptExtractionSummary } from "./LLM07-prompt-extraction-via-summary";

export const ATTACKS: Attack[] = [
  llm01InstructionOverrideBasic,
  llm02PiiExfilStorytelling,
  llm07PromptExtractionSummary,
];

export function getAttackById(id: string): Attack | undefined {
  return ATTACKS.find((a) => a.id === id);
}

export * from "./types";
