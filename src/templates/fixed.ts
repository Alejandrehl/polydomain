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

## The polydomain standard this center upholds
A command center has a thin **router**, on-demand **domain** capsules + a registry, in-repo **memory** (durable facts), an optional **notes store** (deep knowledge, navigated on demand), **governance**, **security**, and a **workspace**. The memory ↔ notes-store boundary: if the agent must know it **every session** → memory; if the agent should be able to **find it when relevant** → the notes store. Full anatomy: the polydomain docs.
`,
  guide: `# Guide — your command center

This is your **single entry point to orchestrate everything** with your AI agent: code in any repo, notes and analysis in your notes store, and any other task. The command center is the operating manual your agent reads; your agent does the work.

## Your first session
Open your agent's entrypoint (e.g. \`CLAUDE.md\`) and say: **"help me set up my command center."** Your agent will explain the system, ask which domains you want, and help you fill them in.

To connect notes: run \`polydomain init --references obsidian\` (or add it later with \`polydomain add reference obsidian\`), then ask your agent to **audit** an existing vault or **generate** a fresh structure.

## How it's organized
- \`<entrypoint>.md\` — the **router** your agent reads each session (startup, always-on rules, where to find things).
- \`domains/\` — one **capsule** per domain. The \`work\` / \`side-project\` capsules are **yours to fill in**; \`domains/_example.md\` is a filled **model** to learn the shape from (read it, then delete or adapt).
- \`memory/\` — **persistent memory** (durable facts across sessions). How it works: \`memory/_how-memory-works.md\`.
- \`references/\` — an optional **notes store** schema (deep knowledge the agent navigates on demand). Add one with \`polydomain add reference obsidian\` (or \`notes\`); the Obsidian flavor adds wikilinks + vault conventions. Memory is for facts known every session; the notes store is for knowledge found when relevant.
- \`workspace/\` — where plans get persisted. \`governance.md\` — what changes need a ritual.

## The Capsule architecture
One agent, many domains: a thin router + composable capsules + memory + a plan → review → approve → execute safety gate. Full methodology: the \`polydomain\` docs site.
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
  notesStore: `# Notes store — schema & operating manual ({{name}})

> Optional capsule (\`--references notes\`). Your external knowledge base — a notes app, a wiki, a folder of markdown — that the agent **reads and writes** to capture analysis, research, and source material. This file is the **schema**: the operating manual the agent follows for the store.

## Where it lives
- Path or URL of your store (e.g. \`~/notes/\`). _Fill this in._

## Index hierarchy (navigate, don't load everything)
The store is navigable in **three reads per question**:
1. \`_index.md\` at the store root — lists **topics**, one line each.
2. \`_index.md\` inside each topic folder — lists the topic's **notes**, one line each.
3. the **note** itself.
Read the root index → the topic index → the target note(s). Keeping both index levels current is what scales the store to thousands of notes without overflowing context.

## Frontmatter (every note — the YAML block at the top of each file)

    type: source | concept | entity | synthesis | index
    created: YYYY-MM-DD
    updated: YYYY-MM-DD
    tags: [topic, ...]
    source: where it came from (URL, doc, person) or "original"
    confidence: high | medium | low

\`confidence\` + \`updated\` let the agent judge **staleness**: a fact can be correct today and wrong after the world changes. Lower the confidence and re-verify before relying on an old note.

## Page types
- **source** — a summary of one captured source.
- **concept** — an idea explained in your own words.
- **entity** — a person, org, product, or place.
- **synthesis** — a conclusion drawn across several notes.
- **index** — a topic listing (the \`_index.md\` files).
Rename or extend these to fit your domains.

## The four operations
- **CAPTURE** — drop a raw source into \`_inbox/\` unchanged. Never edit raw sources in place.
- **COMPILE** — turn an inbox source into a structured note: write it under the right topic (create the topic + its \`_index.md\` if missing), add a \`## Key takeaways\` section, cross-link related notes, then update the topic index and the root index.
- **QUERY** — answer by navigating the index hierarchy; save a valuable answer as a \`synthesis\` note.
- **AUDIT** — scan for contradictions, orphan notes (nothing links to them), missing cross-references, and stale notes (low \`confidence\` or old \`updated\`); report findings.

## Promotion (notes store ↔ source of truth)
When a note matures into a stable fact, decision, or process, **promote** it to the source-of-truth repo for that domain (its formal, versioned record). The store is the notebook; the repo is the record. **Reflect and link — don't copy** (copies drift).

## Writing (permission posture)
- **Default: confirm before writing.** Propose the change, show the content, wait for approval.
- **Opt-in autonomy (narrow):** you may allow append-only writes without confirmation for low-risk logs — e.g. appending to a dated session log. Keep that whitelist small; everything else stays confirm-first.

## If the store isn't there
If the store path is not present (cloud sync not materialized, headless session), mark it **unavailable**, say so explicitly, and **never invent** its contents.

## Keep secrets out
Do not store credentials here (see \`SECURITY.md\`). Connecting a store means its content is sent to the model provider as context — a deliberate choice.
`,
  obsidian: `# Obsidian — store specialization ({{name}})

> Generated with \`--references obsidian\`. Read this **with** \`references/notes-store.md\` (the shared schema). This file adds Obsidian-specific conventions.

## Vault root
Your vault lives at a single path (e.g. \`~/vault/\`). _Fill this in._ Everything in \`notes-store.md\` applies, anchored at this root.

## Wikilinks & backlinks
- Link notes with \`[[note-name]]\` (Obsidian wikilinks), not file paths.
- **Bidirectional:** if note A links to B, B should link back to A. The backlink graph is how you and the agent discover related context.

## Sync / availability
The vault often lives in iCloud, Dropbox, or similar and **may not be materialized** in a given session. If the vault path is absent, mark it unavailable and never invent contents (the schema's degradation rule, for the sync case).

## Optional accelerators (not required)
Plain file reads work out of the box. If your vault grows past a few hundred notes and the "three reads" pattern needs pre-filtering, you **may** add one of these — none are required and none are bundled:
- A **filesystem** Obsidian MCP server (reads the \`.md\` files directly; no plugin, no Obsidian process needed).
- A **REST-API** Obsidian MCP server (needs the Local REST API plugin + Obsidian running).
- A local markdown search CLI for keyword retrieval.

## Security
Connecting your personal vault sends note content to the model provider as context. Keep credentials out of the vault; see \`SECURITY.md\`.
`,
} as const;
