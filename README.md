# polydomain

> A `npx` scaffolder that turns your AI coding agent into a multi-domain **command center** with persistent memory and an optional notes/Obsidian knowledge base — the **Capsule architecture**.

[![CI](https://github.com/Alejandrehl/polydomain/actions/workflows/ci.yml/badge.svg)](https://github.com/Alejandrehl/polydomain/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/polydomain)](https://www.npmjs.com/package/polydomain)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-polydomain-0A0A0A)](https://alejandrehl.github.io/polydomain/)

---

## What it is

AI coding agents suffer from **context amnesia**: every session you re-explain who you are, what you're working on, and how the pieces fit. The more contexts you juggle — work, side projects, personal ops, a notes vault — the worse it gets.

`polydomain` scaffolds a **command center**: a small set of Markdown files your agent reads as its operating manual. One command sets up a thin **router**, per-domain **capsules**, a **memory** protocol, an optional **notes/Obsidian** knowledge base, and a **safety gate**. You start a session in that repo and your agent works as if it already knows your whole context — without re-briefing and without mixing one domain into another.

**How it works (no magic, no runtime):** polydomain only generates Markdown. There is no daemon, no background process, no telemetry. It works because the generated files are an operating manual the agent *reads and follows* — exactly the convention-driven setup power users build by hand, made repeatable and agent-agnostic (Claude Code, Codex, Gemini, Cursor). The value is the codified pattern, not a new runtime.

---

## Quickstart

```bash
npx polydomain init my-center                          # scaffold a command center
npx polydomain init my-center --references obsidian    # …with an Obsidian/notes knowledge base
```

Then open your agent's entrypoint (`CLAUDE.md`, `AGENTS.md`, …) and say **"help me set up my command center."** The router takes it from there.

Already have a repo (notes, docs, a half-structured knowledge base)? Adopt the standard, losslessly:

```bash
cd my-existing-repo && npx polydomain adopt
```

---

## What you get

A command center is **seven parts**, each a small Markdown file or folder ([full anatomy](https://alejandrehl.github.io/polydomain/pattern/anatomy/)):

| Part | What it does |
|---|---|
| **Router** | The agent entrypoint. Routes each session to the right capsule, states the always-on rules. |
| **Domains** | One **capsule** per domain (`domains/*.md`) + a registry. The agent loads only what the session needs — no cross-domain bleed. |
| **Memory** | A portable protocol for durable facts the agent recalls every session ([guide](https://alejandrehl.github.io/polydomain/guides/memory/)). |
| **Notes store** *(optional)* | A schema for an external knowledge base — Obsidian or any Markdown folder — the agent navigates on demand for near-infinite, organized context ([guide](https://alejandrehl.github.io/polydomain/guides/notes-store/)). |
| **Governance / Security** | What changes need a ritual; a `SECURITY.md` reminding you the repo is context, not a vault. |
| **Workspace** | Dated scratch space for plans. |
| **Safety gate** | `plan → review → approve → execute`. The agent proposes; you approve; then it acts. |

---

## Commands

| Command | Description |
|---|---|
| `init [dir]` | Scaffold a new command center (default: current directory) |
| `add domain <name>` | Add a capsule for a new domain |
| `add agent <name>` | Add an entrypoint for another agent (`claude`, `codex`, `gemini`, `cursor`) |
| `add reference <type>` | Add a notes-store capsule (`notes` or `obsidian`) to an existing center |
| `adopt` | Bring an existing repo up to the standard, losslessly (safety branch + an agent playbook) |

### `init` flags

| Flag | Description |
|---|---|
| `--agent <list>` | Target agent(s): `claude`, `codex`, `gemini`, `cursor` (default: `claude`) |
| `--domains <spec>` | `minimal` / `standard` / `full`, or a comma list (default: `standard`) |
| `--references <type>` | Add a notes-store capsule: `notes` (generic) or `obsidian` |
| `--with-references` | Alias for `--references notes` |
| `--no-memory` | Skip the `memory/` directory |
| `--no-git` | Skip `git init` |
| `--force` | Write into a non-empty directory |
| `-y, --yes` | Accept all defaults, no prompts |

Full reference: [CLI docs](https://alejandrehl.github.io/polydomain/reference/cli/).

---

## No telemetry. No network calls.

Templates are bundled with the CLI. `polydomain` **never phones home** — no analytics, no tracking, no external requests. What you scaffold stays entirely on your machine.

---

## Status

Live on npm. The command-center standard, the memory and notes/Obsidian layers, and `adopt` all ship today. polydomain is young — a thin, opinionated tool around a pattern — and the best validation is using it on your own work. Feedback and issues welcome.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup, testing, and PR expectations.

## License

[MIT](LICENSE) — Copyright (c) 2026 Alejandro Hernández Lara
