# polydomain

## 0.5.0

### Minor Changes

- 0bd2031: Add the optional actions layer (macOS-first): `--actions macos` and `add actions macos` generate `actions/macos.md`, a capsule with verified `osascript`/Mail.app recipes for reminders, calendar events, and email.

  - Tiered safety: reminders/calendar run directly (local, reversible); email is **draft-first** (the agent prepares a draft and you send it from Mail; auto-send after approval is opt-in).
  - Documents the macOS Automation-permission prerequisite (and the `-1743` error / headless degradation).
  - The router gains a standing pointer to the actions capsule. New guide: "Actions (macOS)". macOS-first is stated precisely in the README/docs — the core stays cross-platform.
  - WhatsApp and other OS flavors are explicitly deferred.

## 0.4.1

### Patch Changes

- 785f454: Refresh the user-facing surface for the current feature set (README, npm description, docs landing).

  - README rewritten to reflect v0.2–v0.4: persistent memory, the optional notes/Obsidian knowledge base, the `add reference` and `adopt` commands, the `--references` flag, and the seven-part command-center standard (the old README only described the v0.1 scaffolder). Clarifies the no-runtime/no-telemetry model up front.
  - npm `description` + keywords updated to mention memory and Obsidian/notes.
  - Docs landing page lists the actual capabilities and links the memory, notes-store, adopt, and anatomy pages.

## 0.4.0

### Minor Changes

- c542878: Add `polydomain adopt`: bring an existing repo up to the command-center standard, losslessly.

  - `adopt` requires a clean git tree, creates the `adopt/standard` branch, and writes a `MIGRATION.md` playbook — it writes nothing else and edits nothing existing, so the whole operation is reversible with git.
  - The playbook directs your agent (under plan → review → approve → execute) to inventory every file, propose a domain mapping, restructure on the branch (preserving each domain's internals, filling missing standard parts informed by the repo, moving with `git mv`, never deleting without approval), and verify losslessness via `git diff` + a before/after inventory.
  - New guide: "Adopt the standard in an existing repo".

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
