export const FIXED = {
  memoryIndex: `# Memory index — {{name}}

One line per memory file. Loaded each session. Types: \`user\` · \`feedback\` · \`project\` · \`reference\`.

<!-- - [Title](slug.md) — one-line hook -->
`,
  governance: `# Governance — {{name}}

Asymmetric governance keeps rigor where it matters and speed elsewhere.

- **Constitutional files** (the router, this file): change via ritual — propose → approve → changelog entry.
- **Operational files** (capsules, memory, workspace): change directly.
`,
  guide: `# Guide — the Capsule architecture (primer)

This command center follows the **Capsule architecture**: one agent operates across many domains via a thin router + composable capsules, with persistent memory and a plan→review→approve→execute safety gate.

Full methodology: see the \`<TOOL_NAME>\` docs site. Quick map:
- \`<entrypoint>.md\` — the thin router (startup, transversal rules, hierarchy).
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

A command center built with the **Capsule architecture** (\`<TOOL_NAME>\`): one AI coding agent, many domains, with memory and a safety gate.

## Start
Open \`<entrypoint>.md\` in your agent and say hi. Add a domain with \`<TOOL_NAME> add domain <name>\`.

## Layout
- \`<entrypoint>.md\` — the router · \`domains/\` — capsules · \`memory/\` — facts · \`workspace/\` — plans · \`governance.md\`.

See \`GUIDE.md\` for the methodology primer.
`,
  gitignore: `node_modules
.env
.env.*
*.key
*.pem
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
