import type { ModelTarget } from "./attacks/types";

/**
 * Models under test. IDs use AI Gateway's provider-prefixed dot format.
 * Verify current IDs against `GET https://ai-gateway.vercel.sh/v1/models`
 * before the first full run — provider slugs occasionally shift.
 */
export const MODELS: ModelTarget[] = [
  { id: "anthropic/claude-sonnet-4.6", label: "Claude Sonnet 4.6", provider: "anthropic", tier: "flagship" },
  { id: "anthropic/claude-haiku-4.5",  label: "Claude Haiku 4.5",  provider: "anthropic", tier: "budget"   },
  { id: "openai/gpt-5.4",              label: "GPT-5",             provider: "openai",    tier: "flagship" },
  { id: "openai/gpt-5.4-mini",         label: "GPT-5 mini",        provider: "openai",    tier: "budget"   },
  { id: "google/gemini-2.5-pro",       label: "Gemini 2.5 Pro",    provider: "google",    tier: "flagship" },
  { id: "google/gemini-2.5-flash",     label: "Gemini 2.5 Flash",  provider: "google",    tier: "budget"   },
];
