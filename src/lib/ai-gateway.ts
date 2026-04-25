import { generateText } from "ai";
import type { TestModelParams } from "@/src/data/attacks/types";

export interface GatewayCallInput {
  modelId: string;
  systemPrompt: string;
  userPrompt?: string;
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  params: TestModelParams;
}

export interface GatewayCallOutput {
  text: string;
  generationId?: string;
  costUsd?: number;
  latencyMs: number;
  promptTokens?: number;
  completionTokens?: number;
}

/**
 * Thin wrapper over the AI SDK's Gateway-routed call. The AI SDK picks up
 * the gateway automatically when `model` is a provider-prefixed string.
 *
 * Auth resolves in this order (AI SDK default):
 *   1. AI_GATEWAY_API_KEY  — static key, simpler for local scripts
 *   2. VERCEL_OIDC_TOKEN   — auto-injected on Vercel and by `vercel env pull`;
 *                             preferred in CI and production (rotates, no manual key management)
 *
 * The wrapper enforces a per-call timeout so a hung provider cannot stall
 * a full matrix run.
 */
export async function callModel(input: GatewayCallInput): Promise<GatewayCallOutput> {
  const started = Date.now();

  const messages = input.messages
    ? input.messages.map((m) => ({ role: m.role, content: m.content }))
    : input.userPrompt
      ? [{ role: "user" as const, content: input.userPrompt }]
      : [];

  if (messages.length === 0) {
    throw new Error("callModel: must provide either userPrompt or messages");
  }

  const result = await generateText({
    model: input.modelId,
    system: input.systemPrompt,
    messages,
    temperature: input.params.temperature,
    maxOutputTokens: input.params.maxTokens,
    topP: input.params.topP,
    abortSignal: AbortSignal.timeout(60_000),
  });

  const gatewayMeta = extractGatewayCost(result.providerMetadata);

  return {
    text: result.text,
    generationId: result.response?.id,
    costUsd: gatewayMeta.costUsd,
    latencyMs: Date.now() - started,
    promptTokens: result.usage?.inputTokens,
    completionTokens: result.usage?.outputTokens,
  };
}

/**
 * AI Gateway stamps cost into providerMetadata.gateway. Shape may shift,
 * so extraction is defensive rather than strictly typed.
 */
function extractGatewayCost(meta: unknown): { costUsd?: number } {
  if (!meta || typeof meta !== "object") return {};
  const gw = (meta as Record<string, unknown>).gateway;
  if (!gw || typeof gw !== "object") return {};
  const cost = (gw as Record<string, unknown>).cost;
  return { costUsd: typeof cost === "number" ? cost : undefined };
}
