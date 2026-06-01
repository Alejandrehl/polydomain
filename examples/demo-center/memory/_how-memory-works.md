# How memory works — demo-center

This command center has a **persistent, in-repo memory**. Unlike an agent's built-in memory (which lives outside this repo), `memory/` travels with the command center, is reviewable in git, and works for any agent. **Treat `memory/` as the canonical memory for this command center** — don't split facts across another store.

## What a memory is
One durable fact per file: `memory/<slug>.md`, with frontmatter and a short body.

```
---
name: <short-kebab-slug>
description: <one line — used to decide relevance when recalling>
type: user | feedback | project | reference
---

<the fact. For feedback/project, add why it matters and how to apply it.>
```

- **user** — who the user is (role, preferences, how they like to work).
- **feedback** — guidance on how the agent should work (corrections, confirmed approaches) + the why.
- **project** — ongoing work, goals, constraints not derivable from code.
- **reference** — pointers to external resources (URLs, dashboards, repos).

## When to save
Save durable facts worth remembering across sessions: a preference, a confirmed decision, current project state, a useful reference. **Don't** save transient chatter, and **don't** save anything derivable from code or git history.

## How to recall
MEMORY.md is the index — read it at the start of each session. When a memory's `description` matches the current task, open that file. Link related memories with `[[other-slug]]`.

## After saving
Add a one-line pointer to `MEMORY.md`: `- [Title](slug.md) — hook`.

## Privacy
Memory can hold personal context. If you make this command center repo public, review `memory/` first. (Secrets never belong here — see `SECURITY.md`.)
