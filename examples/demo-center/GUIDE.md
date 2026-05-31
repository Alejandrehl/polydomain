# Guide — the Capsule architecture (primer)

This command center follows the **Capsule architecture**: one agent operates across many domains via a thin router + composable capsules, with persistent memory and a plan→review→approve→execute safety gate.

Full methodology: see the `<TOOL_NAME>` docs site. Quick map:
- your agent's entrypoint (e.g. `CLAUDE.md`) — the thin router (startup, transversal rules, hierarchy).
- `domains/` — one capsule per domain; `_registry.md` indexes them.
- `memory/` — durable facts + index.
- `workspace/` — where plans get persisted.
- `governance.md` — what changes need a ritual.
