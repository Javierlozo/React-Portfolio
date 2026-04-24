/**
 * LLM Red Team Lab test rig.
 *
 * Runs every attack in src/data/attacks against every model in src/data/models
 * via Vercel AI Gateway, captures raw responses and metadata, and writes to
 * src/data/llm-results.json. Verdicts are NOT auto-classified; human review
 * happens in a follow-up pass so the research is defensible.
 *
 * Run with env loaded from .env.local:
 *   node --env-file=.env.local --import tsx scripts/run-attacks.ts
 *
 * Or via the npm script:
 *   npm run attacks
 *
 * Flags:
 *   --attack <id>   Run only attacks whose id starts with this string.
 *   --model  <id>   Run only models whose id contains this string.
 *   --force         Re-run even if a result already exists for the pair.
 *   --dry-run       Print what would run, do not call the model.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ATTACKS } from "../src/data/attacks";
import { MODELS } from "../src/data/models";
import { callModel } from "../src/lib/ai-gateway";
import type { AttackResult, ResultsByKey, TestModelParams } from "../src/data/attacks/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTS_PATH = path.resolve(__dirname, "../src/data/llm-results.json");

const DEFAULT_PARAMS: TestModelParams = {
  temperature: 0.7,
  maxTokens: 1024,
};

interface CliFlags {
  attack?: string;
  model?: string;
  force: boolean;
  dryRun: boolean;
}

function parseFlags(argv: string[]): CliFlags {
  const flags: CliFlags = { force: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--attack" && argv[i + 1]) flags.attack = argv[++i];
    else if (arg === "--model" && argv[i + 1]) flags.model = argv[++i];
    else if (arg === "--force") flags.force = true;
    else if (arg === "--dry-run") flags.dryRun = true;
  }
  return flags;
}

async function loadResults(): Promise<ResultsByKey> {
  try {
    const raw = await readFile(RESULTS_PATH, "utf8");
    return JSON.parse(raw) as ResultsByKey;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw err;
  }
}

async function saveResults(results: ResultsByKey): Promise<void> {
  await mkdir(path.dirname(RESULTS_PATH), { recursive: true });
  await writeFile(RESULTS_PATH, JSON.stringify(results, null, 2) + "\n", "utf8");
}

function resultKey(attackId: string, modelId: string): string {
  return `${attackId}::${modelId}`;
}

async function main() {
  const flags = parseFlags(process.argv.slice(2));

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN && !flags.dryRun) {
    console.error("Missing AI_GATEWAY_API_KEY. Populate .env.local (see .env.local.example).");
    process.exit(1);
  }

  const attacks = flags.attack ? ATTACKS.filter((a) => a.id.startsWith(flags.attack!)) : ATTACKS;
  const models = flags.model ? MODELS.filter((m) => m.id.includes(flags.model!)) : MODELS;

  if (attacks.length === 0) {
    console.error(`No attacks match filter --attack ${flags.attack}`);
    process.exit(1);
  }
  if (models.length === 0) {
    console.error(`No models match filter --model ${flags.model}`);
    process.exit(1);
  }

  const results = await loadResults();
  const plan = attacks.flatMap((a) => models.map((m) => ({ attack: a, model: m })));
  const toRun = flags.force ? plan : plan.filter(({ attack, model }) => !results[resultKey(attack.id, model.id)]);

  console.log(
    `Planned: ${plan.length} runs (${attacks.length} attacks x ${models.length} models). ` +
      `Skipping ${plan.length - toRun.length} cached. Running ${toRun.length}.`,
  );

  if (flags.dryRun) {
    for (const { attack, model } of toRun) console.log(`  - ${attack.id} :: ${model.id}`);
    return;
  }

  let ran = 0;
  let errors = 0;
  for (const { attack, model } of toRun) {
    const key = resultKey(attack.id, model.id);
    process.stdout.write(`[${++ran}/${toRun.length}] ${key} ... `);

    try {
      const response = await callModel({
        modelId: model.id,
        systemPrompt: attack.systemPrompt,
        userPrompt: attack.userPrompt,
        messages: attack.turns,
        params: DEFAULT_PARAMS,
      });

      const result: AttackResult = {
        attackId: attack.id,
        modelId: model.id,
        verdict: "blocked",
        response: response.text,
        rationale: "auto-default pending human review",
        testedAt: new Date().toISOString(),
        params: DEFAULT_PARAMS,
        generationId: response.generationId,
        costUsd: response.costUsd,
        latencyMs: response.latencyMs,
      };

      results[key] = result;
      await saveResults(results);
      console.log(`ok (${response.latencyMs}ms, ${response.text.length} chars)`);
    } catch (err) {
      errors++;
      const errResult: AttackResult = {
        attackId: attack.id,
        modelId: model.id,
        verdict: "error",
        response: err instanceof Error ? err.message : String(err),
        rationale: "runtime error during model call",
        testedAt: new Date().toISOString(),
        params: DEFAULT_PARAMS,
      };
      results[key] = errResult;
      await saveResults(results);
      console.log(`ERROR: ${errResult.response}`);
    }
  }

  console.log(`\nDone. ${toRun.length - errors} ok, ${errors} errors. Results: ${RESULTS_PATH}`);
  console.log("Verdicts set to 'blocked' as placeholder — classify manually before publishing.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
