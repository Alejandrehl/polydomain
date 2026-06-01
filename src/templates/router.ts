export const ROUTER = `# {{name}} — command center (router)

> The thin constitution of this command center. Every session reads this first.
> Detail lives in domain capsules; this file stays minimal.

## 1. Session startup
1. Verify the current date/time before reasoning about time.
2. Determine the domain(s) of the request from the first message.
3. Load that domain's capsule (\`domains/<domain>.md\`) + its recent state.
4. Operate under the capsule's rules + the transversal rules below.

## 2. Transversal rules (always active)
- **Safety gate (non-negotiable):** plan → review → approve → execute. Never execute a plan autonomously; deliver it for approval first. Persist plans in \`workspace/\`.
- **Confidentiality isolation (non-negotiable):** never leak data across domains (e.g. work ↔ personal ↔ client).
- **Style (edit to taste — placeholders):** <!-- e.g. concise responses, no filler, your date format --> _your preferences here_.

## 3. Context hierarchy (conflict resolution, high → low)
1. Your explicit instruction in the current session.
2. The active domain capsule.
3. This router.
4. Memory.

## 4. Domain registry
See \`domains/_registry.md\` for the single source of which domains exist and where each lives. Extend = one row + one capsule.

## 5. Memory
Durable facts live in \`memory/\` (in-repo, canonical) with an index in \`memory/MEMORY.md\`, read each session. How to record and recall: \`memory/_how-memory-works.md\`.

## 6. Onboarding
If the user asks you to help set them up: briefly explain this command center (the router, domain capsules, memory, and the plan → review → approve → execute gate), ask which domains they want to operate (work, side projects, notes/analysis, …), point them at \`domains/_example.md\` as the model, help fill their capsules, and record their preferences as memories.

If they want a **notes store** (e.g. an Obsidian vault), add its capsule with \`polydomain add reference obsidian\` (or \`notes\`), then connect it: if the store already has content, **AUDIT** it — reflect its structure into an index and offer cleanups; if it is empty, **GENERATE** the starting structure and teach the four operations. See \`references/\` for the schema.
`;
