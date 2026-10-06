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

// Published notes are hand-curated after their first sync (frontmatter like
// topic/order/labsDone is added, leading H1s are dropped, prose is edited).
// So by default this script only PUBLISHES NEW notes and leaves existing ones
// untouched. It never clobbers a hand-edited body or deletes a curated note.
//
// Flags:
//   --refresh  re-pull the BODY from source for existing notes too, while
//              preserving their curated frontmatter. Use when you deliberately
//              want source content to overwrite the published body. Review the
//              diff afterwards: source may contain em-dashes or leading H1s
//              that the published versions were cleaned of.
//   --prune    delete published notes whose source file is gone (destructive).
const REFRESH = process.argv.includes("--refresh");
const PRUNE = process.argv.includes("--prune");

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

// Split leading "---\n...\n---" frontmatter off the rest of the document.
// Returns { fm, body } where fm is the frontmatter block without delimiters
// (or null if there is none) and body is everything after it.
function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: null, body: text };
  return { fm: m[1], body: text.slice(m[0].length) };
}

function renderFrontmatter(fm) {
  return `---\n${fm}\n---\n`;
}

// Build the target file. The source repo owns the BODY. Frontmatter is
// metadata the site curates (topic, order, labsDone, labsTotal), so it is
// preserved from the existing target unless the source explicitly declares
// its own. Only when neither has frontmatter do we generate a minimal block.
function buildOutput({ sourceRaw, existingTarget, fallbackTitle, sourceUrl }) {
  const src = splitFrontmatter(sourceRaw);
  const body = src.body.replace(/^\n*/, "");

  let fmBlock;
  if (src.fm !== null) {
    // Source author declared frontmatter: it wins.
    fmBlock = renderFrontmatter(src.fm);
  } else if (existingTarget !== null) {
    const tgt = splitFrontmatter(existingTarget);
    if (tgt.fm !== null) fmBlock = renderFrontmatter(tgt.fm); // preserve curated
  }
  if (!fmBlock) {
    const title = extractTitle(body) || fallbackTitle;
    fmBlock = renderFrontmatter(
      `title: "${title.replace(/"/g, '\\"')}"\nsource: "${sourceUrl}"`,
    );
  }

  const out = `${fmBlock}\n${body}`;
  return out.endsWith("\n") ? out : out + "\n";
}

function listTargetFiles(repoSlug) {
  const dir = path.join(TARGET_ROOT, repoSlug);
  if (!fs.existsSync(dir)) return new Set();
  return new Set(listMarkdownFiles(dir).map((f) => f.relPath));
}

function syncOne(repoSlug, sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Source directory not found: ${sourceDir} (skipping)`);
    return { created: 0, updated: 0, orphans: [] };
  }

  const beforeTargets = listTargetFiles(repoSlug);
  const files = listMarkdownFiles(sourceDir);
  const syncedRel = new Set();
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const { fullPath, relPath } of files) {
    const targetPath = path.join(TARGET_ROOT, repoSlug, relPath);
    const existed = fs.existsSync(targetPath);
    syncedRel.add(relPath);

    // Existing note: leave its curated body and frontmatter alone unless the
    // caller explicitly asks to re-pull the body with --refresh.
    if (existed && !REFRESH) {
      skipped++;
      continue;
    }

    const existingTarget = existed ? fs.readFileSync(targetPath, "utf8") : null;
    const sourceRaw = fs.readFileSync(fullPath, "utf8");
    const output = buildOutput({
      sourceRaw,
      existingTarget,
      fallbackTitle: titleFromFilename(relPath),
      sourceUrl: `https://github.com/Javierlozo/${repoSlug}/blob/main/${relPath}`,
    });

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    if (existingTarget !== output) {
      fs.writeFileSync(targetPath, output);
      if (existed) updated++;
      else created++;
    } else {
      skipped++;
    }
  }

  // Published notes with no matching source file. Never deleted by default.
  const orphans = [...beforeTargets].filter((rel) => !syncedRel.has(rel));
  if (PRUNE) {
    for (const rel of orphans) {
      fs.rmSync(path.join(TARGET_ROOT, repoSlug, rel));
    }
  }

  return { created, updated, skipped, orphans };
}

fs.mkdirSync(TARGET_ROOT, { recursive: true });

let anyOrphans = false;
for (const { repoSlug, sourceDir } of SOURCES) {
  const { created, updated, skipped, orphans } = syncOne(repoSlug, sourceDir);
  console.log(
    `${repoSlug}: ${created} created, ${updated} updated, ${skipped} unchanged` +
      (orphans.length
        ? `, ${orphans.length} orphaned${PRUNE ? " (pruned)" : ""}`
        : ""),
  );
  if (orphans.length && !PRUNE) {
    anyOrphans = true;
    for (const rel of orphans) console.log(`    orphan: ${repoSlug}/${rel}`);
  }
}

if (anyOrphans) {
  console.log(
    "\nOrphaned notes exist in content/notes with no source file. They were\n" +
      "left in place. Re-run with --prune to delete them, or restore them to\n" +
      "the source repo if they should stay.",
  );
}

console.log(`\nSynced notes to ${path.relative(PORTFOLIO_ROOT, TARGET_ROOT)}/`);
