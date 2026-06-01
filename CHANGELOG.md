# polydomain

## 0.2.0

### Minor Changes

- 37235b8: Deliver the system's value out of the box: a self-contained, agent-agnostic memory protocol (`memory/_how-memory-works.md`), agent-led onboarding (router + a reframed orchestrator GUIDE), and a filled example capsule (`domains/_example.md`) that shows orchestrating code repos and a notes store. The external-store capsule now reads and writes.

## 0.1.0

### Minor Changes

- 8877a47: Initial public release: a `npx polydomain init` scaffolder for the Capsule architecture — one AI coding agent operated across many domains via a thin router, composable domain capsules, persistent memory, and a plan → review → approve → execute safety gate. Commands: `init`, `add domain`, `add agent`.
