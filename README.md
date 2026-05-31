# <TOOL_NAME>

> A `npx` scaffolder that turns your AI coding agent into a multi-domain command center — the **Capsule architecture**.

---

## What & why

AI coding agents are powerful, but they suffer from context amnesia: every new project requires re-explaining who you are, what you're working on, and how the pieces fit together. The more domains you juggle — work, side projects, personal ops — the worse it gets.

`<TOOL_NAME>` solves this with a single scaffold command. It generates a **thin router** (`CLAUDE.md`, `AGENTS.md`, or equivalent) that your agent reads at session start, plus a set of **capsules** — one lean Markdown file per domain — that carry the context, decisions, and constraints for that slice of your life. A built-in **safety gate** keeps the agent honest: it proposes a plan and waits for your approval before executing. One agent, many domains, zero repetition.

---

## Quickstart

```bash
npx <TOOL_NAME> init my-center
```

Then open your agent's entrypoint (e.g. `CLAUDE.md`) and say hi. The router is ready.

---

## Commands

| Command | Description |
|---|---|
| `init [dir]` | Scaffold a new command center in `[dir]` (default: current directory) |
| `add domain <name>` | Add a new capsule for a domain |
| `add agent <name>` | Add an agent entrypoint (`claude`, `codex`, `gemini`, `cursor`) |

### Key flags

| Flag | Applies to | Description |
|---|---|---|
| `--agent <name>` | `init` | Agent to target (`claude`, `codex`, `gemini`, `cursor`) |
| `--domains <a,b>` | `init` | Comma-separated list of domain capsules to scaffold |
| `--with-references` | `init` | Include a `references/` folder for external source notes |
| `--no-memory` | `init` | Skip the `memory/` directory |
| `--no-git` | `init` | Skip `git init` |
| `--force` | `init` | Write into a non-empty directory |
| `--yes` | `init` | Accept all defaults non-interactively |

---

## No telemetry. No network calls.

Templates are bundled with the CLI. `<TOOL_NAME>` **never phones home** — no analytics, no usage tracking, no external requests of any kind. What you scaffold stays entirely on your machine.

---

## The Capsule architecture

A command center has three layers:

1. **Router** — the agent entrypoint (`CLAUDE.md` / `AGENTS.md`). A thin file that routes each session to the right capsule and states the cross-cutting rules that always apply.
2. **Capsules** (`domains/*.md`) — one file per domain. Each capsule is self-contained: context, decisions, constraints, and the current state of that domain. Agents load only what the session needs.
3. **Safety gate** — the plan → review → approve → execute rule: the agent proposes, you approve, then it executes. Generated repos are also secure by default — the `.gitignore` ignores secrets and a `SECURITY.md` reminds you the repo is context, not a vault.

The result is an agent that knows everything about your context without needing to be re-briefed — and without mixing context between domains.

Full architecture docs: [https://alejandrehl.github.io/<TOOL_NAME>/](https://alejandrehl.github.io/<TOOL_NAME>/)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup, testing, and PR expectations.

## License

[MIT](LICENSE) — Copyright (c) 2026 Alejandro Hernández Lara
