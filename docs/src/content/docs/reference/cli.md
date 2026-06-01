---
title: CLI reference
description: Commands and flags.
---

`polydomain` makes no network calls and collects no telemetry — its templates are bundled with the CLI.

## `init [dir]`

Scaffold a new command center in `[dir]` (defaults to the current directory). Prompts for the target agent(s) unless `--agent` or `--yes` is given.

| Flag | Description |
|---|---|
| `--agent <list>` | Comma-separated agents: `claude`, `codex`, `gemini`, `cursor` (default: `claude`) |
| `--domains <spec>` | `minimal`, `standard`, `full`, or a comma-separated list (default: `standard` = `work,side-project`) |
| `--with-references` | Include a `references/` capsule for an external store |
| `--no-memory` | Skip the `memory/` directory |
| `--no-git` | Skip `git init` |
| `--force` | Write into a non-empty directory |
| `-y, --yes` | Accept all defaults, no prompts |

## `add domain <name>`

Add a domain capsule (`domains/<name>.md`) and register it in `domains/_registry.md`. Run it from inside a command center. The name must be a simple identifier (letters, digits, hyphens); it fails if the capsule already exists.

## `add agent <name>`

Add an entrypoint for another agent (`claude`, `codex`, `gemini`, `cursor`). Run it from inside a command center. Fails if that agent's entrypoint already exists.

## `--help` · `--version`

Standard.
