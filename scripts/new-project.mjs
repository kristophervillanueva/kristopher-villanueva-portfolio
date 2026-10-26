#!/usr/bin/env node
/**
 * Scaffolds a new project file plus its evidence directory.
 *
 *   npm run new:project
 *   npm run new:project -- --slug my-new-project --title "My New Project" --type brief
 *
 * Flags are optional. Anything missing is asked interactively.
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "projects");
const EVIDENCE_DIR = path.join(ROOT, "public", "evidence");

const CATEGORIES = [
  ["backup", "Backup & DR"],
  ["networking", "Networking"],
  ["identity", "Identity & Access"],
  ["m365", "Microsoft 365"],
  ["endpoint", "Endpoint"],
  ["operations", "Operations"],
];

const TYPES = [
  ["brief", "brief — short record, no evidence grid"],
  ["case-study", "case-study — full template with decisions and evidence"],
];

/* ---------- tiny terminal helpers ---------------------------------------- */

const colour = (code) => (text) =>
  process.stdout.isTTY ? `\u001b[${code}m${text}\u001b[0m` : text;

const bold = colour("1");
const dim = colour("2");
const amber = colour("33");
const green = colour("32");
const red = colour("31");

function fail(message) {
  console.error(`\n  ${red("✗")} ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const flags = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      flags[key] = true;
    } else {
      flags[key] = next;
      index += 1;
    }
  }
  return flags;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function yamlString(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** Accepts a flag value only if it is one of the allowed keys. */
function validatedFlag(value, options, fallback) {
  if (typeof value !== "string") return fallback;
  const match = options.find(([key]) => key === value);
  if (!match) {
    fail(
      `"${value}" is not valid here. Choose one of: ${options.map(([key]) => key).join(", ")}.`,
    );
  }
  return match[0];
}

/* ---------- templates ----------------------------------------------------- */

function caseStudyTemplate({ title, subtitle, category, order }) {
  return `---
title: ${yamlString(title)}
subtitle: ${yamlString(subtitle)}
type: case-study
category: ${category}
order: ${order}
featured: false
role: IT Administrator
timeframe: ""
status: in-progress
updated: ${yamlString(new Date().toISOString().slice(0, 7))}
summary: "Two sentences for the project index. Lead with the business problem, not the product."
outcome: "One line describing what actually changed. Delete if unverified."
stack:
  - Product or skill
metrics:
  - value: "0"
    label: "metric label"
evidence:
  - id: example-screenshot
    label: "What the screenshot shows"
    proves: "One sentence on what a viewer can verify from it."
    status: on-request
decisions:
  - decision: "What you chose"
    alternative: "What you rejected"
    why: "The constraint that decided it."
    cost: "What the choice costs you."
notClaiming:
  - "Anything this project does not prove. Be specific."
next:
  - "The honest next step."
---

## The problem

What was wrong, missing or at risk — in business terms before product names.

## Constraints

- What could not change.
- What could not be bought.
- What had to stay working during the change.

## Architecture

Describe the design. If it needs a diagram, ask for one to be added to
\`components/diagrams/\` and referenced in the frontmatter as \`diagram:\`.

## Decisions and trade-offs

<Decisions />

## What the tests actually proved

<Callout title="Describe the test">
What was run, what was observed, and what that does and does not prove.
</Callout>

## Evidence

<Evidence />

## What I am not claiming

<NotClaiming />

## What I would do next

<Next />
`;
}

function briefTemplate({ title, subtitle, category, order }) {
  return `---
title: ${yamlString(title)}
subtitle: ${yamlString(subtitle)}
type: brief
category: ${category}
order: ${order}
featured: false
role: IT Administrator
status: operational
summary: "Two sentences for the project index."
outcome: "One line describing the result."
stack:
  - Product or skill
---

## The problem

What was wrong, missing or at risk.

## What I did

The approach, and the constraint that shaped it.

## What changed

- Concrete outcome only.
- If something is not verified, say so or remove the claim.

## What I would do next

- The honest next step.
`;
}

/* ---------- main ---------------------------------------------------------- */

async function main() {
  const flags = parseArgs(process.argv.slice(2));

  const interactive = !flags.slug;
  const rl = interactive
    ? createInterface({ input: stdin, output: stdout })
    : null;

  const ask = async (question, fallback = "") => {
    if (!rl) return fallback;
    const answer = (await rl.question(question)).trim();
    return answer || fallback;
  };

  const choose = async (label, options, fallback) => {
    if (!rl) return fallback;
    console.log(`\n  ${bold(label)}`);
    options.forEach(([key, text], index) => {
      const marker = key === fallback ? amber("›") : " ";
      console.log(`  ${marker} ${index + 1}. ${text} ${dim(`(${key})`)}`);
    });
    const answer = (await rl.question(`  choice [${fallback}]: `)).trim();
    if (!answer) return fallback;
    const byNumber = options[Number(answer) - 1];
    if (byNumber) return byNumber[0];
    const byKey = options.find(([key]) => key === answer);
    if (byKey) return byKey[0];
    fail(`"${answer}" is not one of the listed options.`);
    return fallback;
  };

  console.log(`\n  ${bold("New project")} ${dim("— scaffolds MDX + evidence folder")}\n`);

  let title = typeof flags.title === "string" ? flags.title : "";
  if (!title) {
    title = await ask("  Title: ");
    if (!title) fail("A title is required.");
  }

  let slug = typeof flags.slug === "string" ? slugify(flags.slug) : slugify(title);
  if (!slug) fail("Could not derive a slug from that title. Pass --slug.");
  if (!/^[a-z0-9-]+$/.test(slug)) fail(`Slug "${slug}" must be lowercase letters, numbers and hyphens.`);

  const targetFile = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(targetFile)) {
    fail(`content/projects/${slug}.mdx already exists. Pick another slug.`);
  }

  const type = await choose("Type", TYPES, validatedFlag(flags.type, TYPES, "brief"));
  const category = await choose(
    "Category",
    CATEGORIES,
    validatedFlag(flags.category, CATEGORIES, "operations"),
  );

  let subtitle = typeof flags.subtitle === "string" ? flags.subtitle : "";
  if (!subtitle) subtitle = await ask("  Subtitle (one line): ", "One line describing what was built.");

  // Next free order number, so new files sort last instead of colliding.
  const existing = fs.existsSync(CONTENT_DIR)
    ? fs
        .readdirSync(CONTENT_DIR)
        .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    : [];
  const maxOrder = existing.reduce((highest, file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const match = /^order:\s*(\d+)/m.exec(raw);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);
  const order = maxOrder + 1;

  const body =
    type === "case-study"
      ? caseStudyTemplate({ title, subtitle, category, order })
      : briefTemplate({ title, subtitle, category, order });

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(targetFile, body, "utf8");

  // Evidence slots only matter for the full template.
  const evidencePath = path.join(EVIDENCE_DIR, slug);
  fs.mkdirSync(evidencePath, { recursive: true });
  fs.writeFileSync(
    path.join(evidencePath, "README.md"),
    [
      `# Evidence for \`${slug}\``,
      "",
      "Drop screenshot files here using the slot id from the project frontmatter:",
      "",
      "```",
      "public/evidence/" + slug + "/<slot-id>.webp",
      "```",
      "",
      "WebP is preferred. PNG and JPEG also work. Then set the slot's `status`",
      "to `verified` and add a `date` in `content/projects/" + slug + ".mdx`,",
      "and redeploy — or upload through `/admin` instead, which writes to Blob",
      "storage and revalidates the page.",
      "",
      "Redaction checklist: docs/REDACTION.md",
      "",
    ].join("\n"),
    "utf8",
  );

  rl?.close();

  const relative = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

  console.log(`\n  ${green("✓")} Created ${bold(relative(targetFile))}`);
  console.log(`  ${green("✓")} Created ${bold(relative(evidencePath))}/`);
  console.log(`\n  Next:`);
  console.log(`    ${dim("1.")} Edit the file and fill in the placeholders.`);
  console.log(`    ${dim("2.")} Add screenshots to the evidence folder, then set each slot to`);
  console.log(`       ${dim("status: verified")} and add a ${dim("date:")}.`);
  console.log(`    ${dim("3.")} ${bold("npm run dev")} and open ${dim(`/projects/${slug}`)}.`);
  if (type === "brief") {
    console.log(
      `\n  ${dim("Briefs have no <Decisions />, <Evidence /> or diagram. Copy those blocks")}\n  ${dim("from content/projects/truenas-backup-dr.mdx if you want to upgrade it.")}`,
    );
  }
  console.log("");
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
