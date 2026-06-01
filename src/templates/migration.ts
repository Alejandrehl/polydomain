export const MIGRATION = `# Adopt the polydomain standard — {{name}}

> Your agent follows this playbook to bring this repo up to the polydomain command-center standard **without losing anything**. You are on the \`adopt/standard\` branch; everything here is reversible with \`git checkout -\`. Work proceeds under **plan → review → approve → execute** — propose, wait for approval, then act.

## The target standard (summary)
A command center has seven parts:
1. **Router** — the entrypoint (\`CLAUDE.md\` / \`AGENTS.md\` / \`GEMINI.md\` / \`.cursor/rules/command-center.mdc\`): startup routing, always-on rules, the plan → review → approve → execute gate.
2. **Domains** — on-demand capsules in \`domains/\` + a \`domains/_registry.md\`.
3. **Memory** — \`memory/\` durable facts + \`memory/MEMORY.md\` index.
4. **Notes store** (optional) — \`references/\` schema for an external knowledge base.
5. **Governance** — \`governance.md\`.
6. **Security** — \`SECURITY.md\`.
7. **Workspace** — \`workspace/\` for plans.

Canonical definition: the polydomain docs, "Anatomy of a command center". This summary is for offline reference; the docs are the source of truth.

## Rules (read before touching anything)
- **Preserve, don't replace.** Never overwrite an existing file. If a part already exists (e.g. a rich router), **adapt it in place**; if it already meets the standard, **leave it unchanged** — no cosmetic churn.
- **Create absent parts informed by this repo**, never from a generic template. Example: a \`SECURITY.md\` must state this repo's actual secret policy — if this repo deliberately versions secrets, say so; do not paste a generic "never commit secrets".
- **Spine, not internals.** The standard governs the top-level structure. Preserve each domain's internal layout as-is.
- **Reconcile memory.** If the repo (or the agent) already has a memory approach, reconcile and link — don't blindly create a parallel store.
- **Never delete.** Move or consolidate; consolidation must preserve content (show before/after). Any real deletion needs the user's explicit approval.
- **Move with \`git mv\`** so history is preserved and diffs read as renames.

## The process
1. **Inventory (before).** List every file — tracked **and** untracked — into \`workspace/adopt/inventory-before.md\`. This is the lossless baseline.
2. **Propose the domain mapping.** Suggest which top-level folders become which domain capsules, and present it for the user to review and adjust (granularity is their call). Wait for approval.
3. **Restructure on this branch.** Fill absent spine parts (contextually), organize and register existing content into the domain model, preserve domain internals, \`git mv\` for moves.
4. **Verify lossless.** Run \`git diff\` against the branch you came from — it shows exactly what moved/changed, and git retains everything. Write \`workspace/adopt/inventory-after.md\` giving each "before" file's disposition (kept / moved-to-X / consolidated-into-Y). Every before-file must be accounted for.
5. **Hand off.** Summarize the diff + inventory for the user. They review and merge when satisfied. To abandon: \`git checkout -\` then \`git branch -D adopt/standard\`.
`;
