import { writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import {
  assertCleanTree,
  assertGitRepo,
  branchExists,
  createBranch,
} from "../core/git.js";
import { render } from "../core/tokens.js";
import { MIGRATION } from "../templates/migration.js";

const BRANCH = "adopt/standard";

export function adoptInRepo(root: string): void {
  assertGitRepo(root);
  assertCleanTree(root);
  if (branchExists(root, BRANCH)) {
    throw new Error(
      `Branch "${BRANCH}" already exists — delete it or check it out to continue.`,
    );
  }
  createBranch(root, BRANCH);
  writeFileSync(
    join(root, "MIGRATION.md"),
    render(MIGRATION, { name: basename(root) }),
    "utf8",
  );
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
