import { existsSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import {
  assertCleanTree,
  assertGitRepo,
  assertHasCommits,
  branchExists,
  createBranch,
} from "../core/git.js";
import { render } from "../core/tokens.js";
import { MIGRATION } from "../templates/migration.js";

const BRANCH = "adopt/standard";

export function adoptInRepo(root: string): void {
  // All checks before any mutation, so a refusal leaves the repo untouched.
  assertGitRepo(root);
  assertHasCommits(root);
  assertCleanTree(root);
  if (branchExists(root, BRANCH)) {
    throw new Error(
      `Branch "${BRANCH}" already exists — delete it or check it out to continue.`,
    );
  }
  const migration = join(root, "MIGRATION.md");
  if (existsSync(migration)) {
    throw new Error(
      "MIGRATION.md already exists — remove or rename it first (adopt never overwrites).",
    );
  }
  createBranch(root, BRANCH);
  writeFileSync(migration, render(MIGRATION, { name: basename(root) }), "utf8");
}

export async function runAdopt(): Promise<void> {
  const root = process.cwd();
  adoptInRepo(root);
  console.log(`Wrote MIGRATION.md on branch ${BRANCH}.`);
  console.log(
    `Review and commit it, then open your agent and say: "adopt the polydomain standard."`,
  );
  console.log(`To undo: git checkout - && git branch -D ${BRANCH}`);
}
