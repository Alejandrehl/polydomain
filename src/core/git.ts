import { execSync } from "node:child_process";

function git(root: string, args: string): string {
  return execSync(`git ${args}`, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

export function assertGitRepo(root: string): void {
  try {
    git(root, "rev-parse --is-inside-work-tree");
  } catch {
    throw new Error("adopt needs a git repository — run `git init` first.");
  }
}

export function assertCleanTree(root: string): void {
  // --untracked-files=no: untracked files are allowed; only staged/unstaged changes count as dirty.
  const status = git(root, "status --porcelain --untracked-files=no");
  if (status.length > 0) {
    throw new Error(
      "Working tree not clean — commit or stash your changes first.",
    );
  }
}

export function branchExists(root: string, name: string): boolean {
  try {
    git(root, `rev-parse --verify --quiet refs/heads/${name}`);
    return true;
  } catch {
    return false;
  }
}

export function createBranch(root: string, name: string): void {
  execSync(`git checkout -b ${name}`, { cwd: root, stdio: "ignore" });
}
