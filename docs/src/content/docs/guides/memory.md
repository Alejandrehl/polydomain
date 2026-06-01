---
title: Memory
description: How a command center remembers across sessions.
---

A command center has a **persistent, in-repo memory** under `memory/`. Unlike an agent's built-in memory (which lives outside the repo), this memory travels with the command center, is reviewable in git, and works for any agent — it is the canonical store for that command center.

## One fact per file
Each memory is `memory/<slug>.md` with frontmatter: `name`, `description` (one line, used to decide relevance on recall), and `type` (`user` / `feedback` / `project` / `reference`). The body is the fact.

## When to save
Durable facts worth remembering across sessions — a preference, a confirmed decision, project state, a reference. Not transient chatter, and nothing derivable from code or git.

## How recall works
`MEMORY.md` is a lightweight index read at the start of each session. When a memory's description matches the task, the agent opens that file. This is what makes long-running context practical without re-explaining everything.

## Privacy
Memory can hold personal context — if you make a command center repo public, review `memory/` first. Secrets never belong there (see the generated `SECURITY.md`).
