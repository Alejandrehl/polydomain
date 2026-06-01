# Guide — your command center

This is your **single entry point to orchestrate everything** with your AI agent: code in any repo, notes and analysis in your notes store, and any other task. The command center is the operating manual your agent reads; your agent does the work.

## Your first session
Open your agent's entrypoint (e.g. `CLAUDE.md`) and say: **"help me set up my command center."** Your agent will explain the system, ask which domains you want, and help you fill them in.

To connect notes: run `polydomain init --references obsidian` (or add it later with `polydomain add reference obsidian`), then ask your agent to **audit** an existing vault or **generate** a fresh structure.

## How it's organized
- `<entrypoint>.md` — the **router** your agent reads each session (startup, always-on rules, where to find things).
- `domains/` — one **capsule** per domain. The `work` / `side-project` capsules are **yours to fill in**; `domains/_example.md` is a filled **model** to learn the shape from (read it, then delete or adapt).
- `memory/` — **persistent memory** (durable facts across sessions). How it works: `memory/_how-memory-works.md`.
- `references/` — an optional **notes store** schema (deep knowledge the agent navigates on demand). Add one with `polydomain add reference obsidian` (or `notes`); the Obsidian flavor adds wikilinks + vault conventions. Memory is for facts known every session; the notes store is for knowledge found when relevant.
- `workspace/` — where plans get persisted. `governance.md` — what changes need a ritual.

## The Capsule architecture
One agent, many domains: a thin router + composable capsules + memory + a plan → review → approve → execute safety gate. Full methodology: the `polydomain` docs site.
