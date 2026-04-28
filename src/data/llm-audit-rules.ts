// Rule data for the /llm-audit showcase page. Mirrors the YAML rules in
// the llm-audit repo at github.com/Javierlozo/llm-audit/tree/main/rules.
// Kept in this app rather than fetched from GitHub so the page is fully
// static and never depends on network state.

export interface LlmAuditRule {
  id: string;
  owasp: string;
  cwe: string[];
  severity: "ERROR" | "WARNING";
  oneLine: string;
  whyAiWritesIt: string;
  vulnerable: string;
  safe: string;
  fix: string;
  language: "typescript" | "tsx";
}

export const LLM_AUDIT_RULES: LlmAuditRule[] = [
  {
    id: "untrusted-input-in-system-prompt",
    owasp: "LLM01: Prompt Injection",
    cwe: ["CWE-77", "CWE-94"],
    severity: "ERROR",
    oneLine:
      "User-controlled input flowing into the LLM `system` role across Anthropic, OpenAI, and the Vercel AI SDK.",
    whyAiWritesIt:
      "Assistants frequently lift the user's customization into the `system` role to make the model follow it. That breaks the authority boundary between developer and user.",
    vulnerable: `import { generateText } from "ai";

export async function vuln(req: any) {
  return generateText({
    model: "claude-opus-4-7" as any,
    system: req.body.persona,                // user controls the system prompt
    prompt: "Tell me about portfolios.",
  });
}`,
    safe: `import { generateText } from "ai";
import { z } from "zod";

const Body = z.object({ question: z.string().min(1).max(2000) });

export async function safe(req: any) {
  const { question } = Body.parse(req.body);
  return generateText({
    model: "claude-opus-4-7" as any,
    system: "You are a portfolio assistant. Stay strictly on topic.",
    messages: [{ role: "user", content: question }],
  });
}`,
    fix: "Keep the system prompt static in code. Place user input only in the `user` role. Validate input shape with zod / valibot at the request boundary.",
    language: "typescript",
  },
  {
    id: "untrusted-input-concatenated-into-prompt-template",
    owasp: "LLM01: Prompt Injection",
    cwe: ["CWE-77"],
    severity: "ERROR",
    oneLine:
      "User input concatenated into a single-string prompt with no role boundary between instructions and untrusted text.",
    whyAiWritesIt:
      "Template-literal prompts are the path of least resistance. Every prompt-engineering tutorial reinforces the shape, so assistants reproduce it.",
    vulnerable: `import { generateText } from "ai";

export async function vuln(req: any) {
  return generateText({
    model: "claude-opus-4-7" as any,
    prompt: \`Translate the following to French:
\${req.body.text}

Output only the translation.\`,
  });
}`,
    safe: `import { generateText } from "ai";
import { z } from "zod";

const Body = z.object({ text: z.string().min(1).max(4000) });

export async function safe(req: any) {
  const { text } = Body.parse(req.body);
  return generateText({
    model: "claude-opus-4-7" as any,
    system: "Translate the user's text to French. Output only the translation.",
    messages: [{ role: "user", content: text }],
  });
}`,
    fix: "Use the `messages` API with explicit role boundaries. User input goes only into the `user` role. Validate length and shape with a schema.",
    language: "typescript",
  },
  {
    id: "llm-output-insecure-handling",
    owasp: "LLM02: Insecure Output Handling",
    cwe: ["CWE-79", "CWE-94", "CWE-78"],
    severity: "ERROR",
    oneLine:
      "Model output piped into `eval`, `dangerouslySetInnerHTML`, `child_process.exec`, or raw `innerHTML`.",
    whyAiWritesIt:
      "The 'ask the model for code/HTML/a shell command and run it' loop is the canonical demo for agentic AI. Assistants reproduce it without the sanitization layer the demo skipped.",
    vulnerable: `import { generateText } from "ai";

export async function VulnComponent() {
  const r = await generateText({
    model: "claude-opus-4-7" as any,
    prompt: "give me html",
  });
  return <div dangerouslySetInnerHTML={{ __html: r.text }} />;
}`,
    safe: `import { generateText } from "ai";
import DOMPurify from "isomorphic-dompurify";

export async function safe(el: HTMLElement) {
  const r = await generateText({
    model: "claude-opus-4-7" as any,
    prompt: "give me a paragraph",
  });
  el.innerHTML = DOMPurify.sanitize(r.text);
}`,
    fix: "Validate output against a schema before use. Sanitize before rendering as HTML or markdown. Never pass model output to `eval`, `Function`, or a shell sink.",
    language: "tsx",
  },
  {
    id: "model-output-parsed-without-schema",
    owasp: "LLM02: Insecure Output Handling",
    cwe: ["CWE-20"],
    severity: "WARNING",
    oneLine:
      "`JSON.parse` on raw model output without a schema validator on the path.",
    whyAiWritesIt:
      "Prompts that say 'respond in JSON' are treated as authoritative. JSON.parse is the reflex move; schema validation is extra ceremony demos skip.",
    vulnerable: `import { generateText } from "ai";

export async function vuln() {
  const r = await generateText({
    model: "claude-opus-4-7" as any,
    prompt: "respond with JSON: { user, balance }",
  });
  return JSON.parse(r.text);                 // shape is whatever the model emits
}`,
    safe: `import { generateText } from "ai";
import { z } from "zod";

const Reply = z.object({
  user: z.string(),
  balance: z.number(),
});

export async function safe() {
  const r = await generateText({
    model: "claude-opus-4-7" as any,
    prompt: "respond with JSON: { user, balance }",
  });
  return Reply.parse(JSON.parse(r.text));
}`,
    fix: "Use `generateObject` (AI SDK) or structured outputs (OpenAI `responseFormat: json_schema`) so the model is constrained. Or run output through a zod / valibot validator before access.",
    language: "typescript",
  },
  {
    id: "hardcoded-llm-api-key",
    owasp: "LLM06: Sensitive Information Disclosure",
    cwe: ["CWE-798"],
    severity: "ERROR",
    oneLine:
      "Inline `apiKey:` strings in OpenAI / Anthropic / AI SDK constructors, or `sk-...` shapes in source.",
    whyAiWritesIt:
      "Quickstart examples show inline keys for brevity. Assistants regress to that shape under 'make it self-contained.'",
    vulnerable: `import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: "sk-proj-AAAA1111BBBB2222CCCC3333DDDD4444",
});`,
    safe: `import OpenAI from "openai";
import { z } from "zod";

const Env = z.object({
  OPENAI_API_KEY: z.string().min(1),
});
const env = Env.parse(process.env);

export const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });`,
    fix: "Read keys from environment variables, validated at startup with a schema. Use OIDC / workload identity where supported. Run gitleaks in CI as a backstop.",
    language: "typescript",
  },
];
