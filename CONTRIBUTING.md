# Contributing

## Dev setup

```bash
pnpm install
```

## Common commands

| Command | What it does |
|---|---|
| `pnpm test` | Run the unit + snapshot test suite |
| `pnpm typecheck` | TypeScript type-check (no emit) |
| `pnpm lint` | Biome lint + format check |
| `pnpm build` | Compile to `dist/` via tsup |
| `pnpm smoke` | End-to-end smoke test against the compiled CLI |

Run `pnpm test && pnpm typecheck && pnpm lint && pnpm build && pnpm smoke` before opening a PR to confirm everything is clean.

## Adding a changeset

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and release notes.

When your change warrants a version bump, run:

```bash
pnpm changeset
```

Follow the prompts (patch / minor / major) and commit the generated `.changeset/*.md` file alongside your code changes. A release PR is opened automatically by CI when changesets accumulate on `main`.

## PR expectations

- All tests pass (`pnpm test`).
- TypeScript compiles cleanly (`pnpm typecheck`).
- Lint is clean (`pnpm lint`).
- Smoke test passes (`pnpm smoke`).
- A changeset is included if the change affects published behaviour.
- No `TODO`, `FIXME`, or placeholder markers in the submitted diff.
