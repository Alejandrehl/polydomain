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
| `--with-references` | Alias for `--references notes` |
| `--references <type>` | Add a notes-store capsule: `notes` (generic core) or `obsidian` (core + Obsidian conventions) |
| `--no-memory` | Skip the `memory/` directory |
| `--no-git` | Skip `git init` |
| `--force` | Write into a non-empty directory |
| `-y, --yes` | Accept all defaults, no prompts |

## `add domain <name>`

Add a domain capsule (`domains/<name>.md`) and register it in `domains/_registry.md`. Run it from inside a command center. The name must be a simple identifier (letters, digits, hyphens); it fails if the capsule already exists.

## `add agent <name>`

Add an entrypoint for another agent (`claude`, `codex`, `gemini`, `cursor`). Run it from inside a command center. Fails if that agent's entrypoint already exists.

## `add reference <type>`

Add a notes-store capsule to an existing command center: `notes` (the generic `references/notes-store.md` core) or `obsidian` (the core plus `references/obsidian.md`). Run it from inside a command center. Fails on an unknown type or if the capsule already exists.

## `adopt`

Bring an existing repo up to the command-center standard. Run it from inside a git repo with a clean working tree. It creates the `adopt/standard` branch and writes `MIGRATION.md` (a playbook your agent follows); it writes nothing else and edits nothing. Fails if the directory is not a git repo, the tree is dirty, or the branch already exists. See [Adopt an existing repo](/polydomain/guides/adopt/).

## `--help` · `--version`

Standard.
