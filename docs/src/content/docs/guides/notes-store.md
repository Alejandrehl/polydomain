---
title: Connect a notes store (Obsidian)
description: Give your agent an organized, navigable knowledge base with near-infinite context.
---

A notes store turns a folder of markdown — an Obsidian vault, a wiki, any notes app — into a knowledge base your agent reads and writes. Add it at init or later:

```bash
polydomain init --references obsidian   # core + Obsidian conventions
polydomain init --references notes       # generic core only
polydomain add reference obsidian        # add to an existing center
```

## The index hierarchy (near-infinite context)

The store is navigable in **three reads per question**: a root `_index.md` lists topics, each topic's `_index.md` lists its notes, and the note holds the content. The agent reads root index → topic index → note, instead of loading everything. This is what lets a store of thousands of notes fit in context.

## Frontmatter

Every note carries `type`, `created`, `updated`, `tags`, `source`, and `confidence`. The `confidence` and `updated` fields let the agent judge **staleness** — a fact true today can be wrong tomorrow.

## The four operations

- **CAPTURE** — drop a raw source into `_inbox/`, unchanged.
- **COMPILE** — turn it into a structured note, cross-link it, update the indexes.
- **QUERY** — navigate the indexes to answer; save valuable answers as notes.
- **AUDIT** — find contradictions, orphans, missing links, and stale notes.

## Two ways to start

- **Already have a vault?** Ask your agent to **audit** it: it reflects your existing structure into an index and offers cleanups (nothing is imposed — every change goes through the review gate).
- **New to notes?** Ask it to **generate** a starter structure and teach you the operations.

## Optional accelerators

Plain file reads work out of the box. For large vaults you *may* add a filesystem Obsidian MCP server (no plugin needed) or a local search CLI — none are required or bundled.

## Promotion & privacy

When a note matures into a stable fact, promote it to its domain's source-of-truth repo — reflect and link, don't copy. Keep credentials out of the store; its content is sent to the model provider as context.
