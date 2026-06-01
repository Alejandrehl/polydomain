# polydomain

## 0.3.0

### Minor Changes

- e5b7bd9: Add the notes-store layer: an organized, navigable external knowledge base for your agent.

  - New `--references <type>` flag (`notes` | `obsidian`) and `add reference <type>` command. `--with-references` is kept as an alias for `--references notes`.
  - `references/notes-store.md` (generic core) teaches the index hierarchy ("three reads per question"), a frontmatter standard with `confidence`/`updated` for staleness, page types, the four operations (CAPTURE/COMPILE/QUERY/AUDIT), promotion, a confirm-by-default write posture, graceful degradation, and a secrets warning.
  - `references/obsidian.md` (specialization) adds wikilinks + backlinks, vault-root and sync conventions, and optional (never required) MCP/search accelerators.
  - Onboarding gains AUDIT (existing vault) and GENERATE (new vault) modes. New docs: "Anatomy of a command center" and "Connect a notes store (Obsidian)".

  Replaces the thin `external-store.md` capsule with `notes-store.md`.

## 0.2.1

### Patch Changes

- 677bf14: Harden the CLI and tests (audit follow-up):

  - An unknown top-level command now prints a clear error and exits non-zero (was a silent no-op exiting 0). Bare invocation prints help.
  - Add regression coverage for the `cursor` nested-dir entrypoint, the `--no-memory` flag plumbing, and the unknown-command path.
  - Tighten template assertions (memory-type enum, external-store read+write, example notes-store framing) so they fail on regression instead of matching incidental prose.

## 0.2.0

### Minor Changes

- 37235b8: Deliver the system's value out of the box: a self-contained, agent-agnostic memory protocol (`memory/_how-memory-works.md`), agent-led onboarding (router + a reframed orchestrator GUIDE), and a filled example capsule (`domains/_example.md`) that shows orchestrating code repos and a notes store. The external-store capsule now reads and writes.

## 0.1.0

### Minor Changes

- 8877a47: Initial public release: a `npx polydomain init` scaffolder for the Capsule architecture — one AI coding agent operated across many domains via a thin router, composable domain capsules, persistent memory, and a plan → review → approve → execute safety gate. Commands: `init`, `add domain`, `add agent`.
