# polydomain

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
