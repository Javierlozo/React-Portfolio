#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORTFOLIO_ROOT = path.resolve(__dirname, "..");

const SOURCES = [
  {
    repoSlug: "tcm-pwpa-notes",
    sourceDir: path.resolve(PORTFOLIO_ROOT, "..", "tcm"),
  },
  {
    repoSlug: "portswigger-academy-notes",
    sourceDir: path.resolve(PORTFOLIO_ROOT, "..", "portswigger-academy-notes"),
  },
];

const TARGET_ROOT = path.join(PORTFOLIO_ROOT, "content", "notes");
const SKIP_FILES = new Set(["README.md", "_template.md"]);

function listMarkdownFiles(dir, relPrefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...listMarkdownFiles(fullPath, rel));
    } else if (entry.name.endsWith(".md") && !SKIP_FILES.has(entry.name)) {
      out.push({ fullPath, relPath: rel });
    }
  }
  return out;
}

function extractTitle(body) {
  const m = body.match(/^#\s+(.+?)$/m);
  return m ? m[1].trim() : null;
}

function titleFromFilename(relPath) {
  return path
    .basename(relPath, ".md")
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ensureFrontmatter(body, fallbackTitle, sourceUrl) {
  if (body.startsWith("---")) return body;
  const title = extractTitle(body) || fallbackTitle;
  const fm = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${sourceUrl}"`,
    "---",
    "",
  ].join("\n");
  return fm + "\n" + body;
}

function clearTarget(repoSlug) {
  const dir = path.join(TARGET_ROOT, repoSlug);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}

function syncOne(repoSlug, sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Source directory not found: ${sourceDir} (skipping)`);
    return 0;
  }
  clearTarget(repoSlug);
  const files = listMarkdownFiles(sourceDir);
  let count = 0;
  for (const { fullPath, relPath } of files) {
    const targetPath = path.join(TARGET_ROOT, repoSlug, relPath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    const raw = fs.readFileSync(fullPath, "utf8");
    const fallback = titleFromFilename(relPath);
    const sourceUrl = `https://github.com/Javierlozo/${repoSlug}/blob/main/${relPath}`;
    fs.writeFileSync(targetPath, ensureFrontmatter(raw, fallback, sourceUrl));
    count++;
  }
  return count;
}

fs.mkdirSync(TARGET_ROOT, { recursive: true });

let total = 0;
for (const { repoSlug, sourceDir } of SOURCES) {
  const n = syncOne(repoSlug, sourceDir);
  console.log(`${repoSlug}: ${n} files`);
  total += n;
}
console.log(
  `\nSynced ${total} notes to ${path.relative(PORTFOLIO_ROOT, TARGET_ROOT)}/`,
);
