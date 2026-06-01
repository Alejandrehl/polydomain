---
title: Anatomy of a command center
description: The seven parts of a polydomain command center and the conventions that hold them together.
---

A command center is a markdown repo your agent reads as its operating manual. It has seven parts, each with one responsibility.

1. **Router** — the entry point (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, or `.cursor/rules/command-center.mdc`). Startup routing, always-on rules, and the `plan → review → approve → execute` gate.
2. **Domains** — on-demand capsules in `domains/`, plus `domains/_registry.md`. Each capsule declares its entry point, where its work lives, its rules, its permissions, and its recent state.
3. **Memory** — `memory/` holds durable facts, indexed by `memory/MEMORY.md` and governed by `memory/_how-memory-works.md`.
4. **Notes store** *(optional)* — `references/` holds the schema for an external knowledge base the agent navigates on demand.
5. **Governance** — `governance.md`: what changes need a ritual, and the source-of-truth hierarchy.
6. **Security** — `SECURITY.md`: keep secrets out of the repo.
7. **Workspace** — `workspace/`: dated scratch space for plans.

## Memory vs. the notes store

Both hold knowledge, but they are different tools:

- **Memory** is compact, durable facts the agent recalls **every session** — preferences, decisions, project state. Small, in-repo, always loaded via the index.
- **The notes store** is the deep knowledge base — analysis, research, source material — the agent **navigates on demand**. Large, external, never fully loaded.

Rule of thumb: *if the agent must know it every session, it's memory; if the agent should find it when relevant, it's the notes store.*
