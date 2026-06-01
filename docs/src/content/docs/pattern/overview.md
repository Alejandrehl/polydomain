---
title: Overview
description: What polydomain is and the problem it solves.
---

AI coding agents are powerful, but they start every session from zero. The moment you switch projects, you re-explain who you are, what you're working on, and how the pieces fit. The more contexts you juggle — a day job, a couple of side projects, personal ops — the more time you spend re-briefing the agent instead of working.

The usual answer is a per-project instruction file (a `CLAUDE.md`, `AGENTS.md`, or similar). That helps inside one repo, but it doesn't scale across many: each file repeats the same rules, none of them share memory, and nothing routes the agent between contexts.

## A command center instead of scattered files

`polydomain` scaffolds a single **command center** — one repo your agent operates from, across all your domains. It generates:

- a **thin router** (your agent's entrypoint) that every session reads first;
- one **capsule** per domain (`domains/*.md`) carrying that domain's context, rules, and state;
- a **memory** index the agent reads each session;
- a **safety gate** baked into the router: the agent proposes a plan and waits for your approval before executing.

The result: one agent that already knows your context, loads only what the current task needs, and never mixes one domain's data into another.

This is the **Capsule architecture** — a small, opinionated way of organizing an agent across many contexts. The [principles](/polydomain/pattern/principles/) state it in full; you can adopt the pattern by hand, or scaffold it in one command — see [getting started](/polydomain/guides/getting-started/).
