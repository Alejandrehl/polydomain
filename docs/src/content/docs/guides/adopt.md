---
title: Adopt the standard in an existing repo
description: Bring an existing repo up to the command-center standard, losslessly, with git as the safety net.
---

Already have a repo — notes, docs, a half-structured knowledge base — and want it to become a proper command center? `adopt` sets up a safe path and hands your agent a playbook.

```bash
cd my-existing-repo
npx polydomain adopt
```

## What the command does

It is deliberately minimal and touches nothing existing:

1. Requires a **git repo** with a **clean working tree** (untracked files are fine; commit or stash tracked changes first).
2. Creates the **`adopt/standard` branch** — so the whole operation is reversible.
3. Writes one file, **`MIGRATION.md`** (the playbook), uncommitted.

It writes no other files and never edits or overwrites anything. To undo at any point: `git checkout -` then `git branch -D adopt/standard`.

## What your agent does

Commit `MIGRATION.md`, then tell your agent **"adopt the polydomain standard."** It follows the playbook under plan → review → approve → execute:

1. **Inventory** every file (tracked + untracked) as a lossless baseline.
2. **Propose a domain mapping** for you to review and adjust.
3. **Restructure on the branch** — fill the missing standard parts (informed by your repo, never generic), organize content into domains, and **preserve each domain's internals**. It moves with `git mv` and **never deletes** (deletion needs your explicit approval).
4. **Verify lossless** — `git diff` shows exactly what changed, and an inventory accounts for every original file.

You review the diff and merge when satisfied. Nothing is lost: it all lives on the branch in git.
