---
title: Getting started
description: Scaffold a command center in 30 seconds.
---

## Scaffold a command center

```bash
npx polydomain init my-center
```

`init` asks which agent(s) will operate the center (Claude Code, Codex, Gemini, or Cursor) and scaffolds the rest with sensible defaults. To skip the prompt:

```bash
npx polydomain init my-center --yes --agent claude
```

## What you get

```
my-center/
├── CLAUDE.md            # the router (your agent's entrypoint)
├── domains/
│   ├── _registry.md     # the list of domains
│   ├── work.md          # a domain capsule
│   └── side-project.md
├── memory/MEMORY.md     # the memory index
├── workspace/           # where plans are persisted
├── governance.md
├── GUIDE.md
├── SECURITY.md
└── .gitignore
```

The entrypoint filename matches your agent: `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex, `GEMINI.md` for Gemini, `.cursor/rules/command-center.mdc` for Cursor.

Two things make it useful immediately: `domains/_example.md` is a filled **model** showing what a good capsule looks like (read it, then adapt or delete), and `memory/_how-memory-works.md` teaches your agent how to remember across sessions. On your first session, just tell your agent **"help me set up my command center."**

## Use it

Open your agent's entrypoint (e.g. `CLAUDE.md`) and start a session. The router tells the agent how to find the right capsule, which rules always apply, and to propose a plan before acting.

## Add a domain

```bash
cd my-center
npx polydomain add domain clients
```

This creates `domains/clients.md` and registers it. See the [CLI reference](/polydomain/reference/cli/) for all commands and flags.
