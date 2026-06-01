export const FIXED = {
  memoryIndex: `# Memory index — {{name}}

One line per memory file; this index is read at the start of each session. How it works: \`_how-memory-works.md\`. Types: \`user\` · \`feedback\` · \`project\` · \`reference\`.

<!-- - [Title](slug.md) — one-line hook -->
`,
  memoryProtocol: `# How memory works — {{name}}

This command center has a **persistent, in-repo memory**. Unlike an agent's built-in memory (which lives outside this repo), \`memory/\` travels with the command center, is reviewable in git, and works for any agent. **Treat \`memory/\` as the canonical memory for this command center** — don't split facts across another store.

## What a memory is
One durable fact per file: \`memory/<slug>.md\`, with frontmatter and a short body.

\`\`\`
---
name: <short-kebab-slug>
description: <one line — used to decide relevance when recalling>
type: user | feedback | project | reference
---

<the fact. For feedback/project, add why it matters and how to apply it.>
\`\`\`

- **user** — who the user is (role, preferences, how they like to work).
- **feedback** — guidance on how the agent should work (corrections, confirmed approaches) + the why.
- **project** — ongoing work, goals, constraints not derivable from code.
- **reference** — pointers to external resources (URLs, dashboards, repos).

## When to save
Save durable facts worth remembering across sessions: a preference, a confirmed decision, current project state, a useful reference. **Don't** save transient chatter, and **don't** save anything derivable from code or git history.

## How to recall
MEMORY.md is the index — read it at the start of each session. When a memory's \`description\` matches the current task, open that file. Link related memories with \`[[other-slug]]\`.

## After saving
Add a one-line pointer to \`MEMORY.md\`: \`- [Title](slug.md) — hook\`.

## Privacy
Memory can hold personal context. If you make this command center repo public, review \`memory/\` first. (Secrets never belong here — see \`SECURITY.md\`.)
`,
  governance: `# Governance — {{name}}

Asymmetric governance keeps rigor where it matters and speed elsewhere.

- **Constitutional files** (the router, this file): change via ritual — propose → approve → changelog entry.
- **Operational files** (capsules, memory, workspace): change directly.
`,
  guide: `# Guide — the Capsule architecture (primer)

This command center follows the **Capsule architecture**: one agent operates across many domains via a thin router + composable capsules, with persistent memory and a plan→review→approve→execute safety gate.

Full methodology: see the \`polydomain\` docs site. Quick map:
- your agent's entrypoint (e.g. \`CLAUDE.md\`) — the thin router (startup, transversal rules, hierarchy).
- \`domains/\` — one capsule per domain; \`_registry.md\` indexes them.
- \`memory/\` — durable facts + index.
- \`workspace/\` — where plans get persisted.
- \`governance.md\` — what changes need a ritual.
`,
  security: `# Security

**This repo is context, not a vault.** Do not commit secrets, API keys, tokens, or PII here.
- Keep credentials in a real secret manager / your shell env, not in capsules or memory.
- The \`.gitignore\` ignores common secret files by default — do not weaken it.
- If you must reference a secret's existence, point to where it lives; never paste its value.
`,
  readme: `# {{name}}

A command center built with the **Capsule architecture** (\`polydomain\`): one AI coding agent, many domains, with memory and a safety gate.

## Start
Open your agent's entrypoint (e.g. \`CLAUDE.md\`) and say hi. Add a domain with \`polydomain add domain <name>\`.

## Layout
- your agent's entrypoint (e.g. \`CLAUDE.md\`) — the router · \`domains/\` — capsules · \`memory/\` — facts · \`workspace/\` — plans · \`governance.md\`.

See \`GUIDE.md\` for the methodology primer.
`,
  gitignore: `node_modules
.env
.env.*
**/.env
*.key
*.pem
*.p12
.DS_Store
*.log
`,
  externalStore: `# Reference — external store (example integration)

> Optional capsule: how the agent reads/links an external knowledge store (notes app, wiki).
> Generic placeholder — point it at your store; keep secrets out (see SECURITY.md).

## Where it lives
- Path or URL of your external store.

## Rules
- Read-only by default; writes via the safety gate.
`,
} as const;
