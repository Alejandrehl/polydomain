import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertCleanTree,
  assertGitRepo,
  assertHasCommits,
  branchExists,
  createBranch,
} from "../../src/core/git.js";

function gitRepo(): string {
  const dir = mkdtempSync(join(tmpdir(), "git-"));
  execSync("git init", { cwd: dir, stdio: "ignore" });
  // A real repo being adopted has commits; an initial commit gives branches real refs
  // (an unborn branch in an empty repo has no ref). Local identity avoids global git config.
  execSync("git config user.email t@t && git config user.name t", {
    cwd: dir,
    stdio: "ignore",
  });
  execSync("git commit --allow-empty -m init", { cwd: dir, stdio: "ignore" });
  return dir;
}

describe("git safety helpers", () => {
  it("assertGitRepo throws in a non-git dir", () => {
    const dir = mkdtempSync(join(tmpdir(), "plain-"));
    expect(() => assertGitRepo(dir)).toThrow(/needs a git repository/i);
  });
  it("assertGitRepo passes in a git repo", () => {
    expect(() => assertGitRepo(gitRepo())).not.toThrow();
  });
  it("assertCleanTree passes with only untracked files", () => {
    const dir = gitRepo();
    writeFileSync(join(dir, "untracked.txt"), "x");
    expect(() => assertCleanTree(dir)).not.toThrow();
  });
  it("assertCleanTree throws with a staged change", () => {
    const dir = gitRepo();
    writeFileSync(join(dir, "a.txt"), "x");
    execSync("git add a.txt", { cwd: dir, stdio: "ignore" });
    expect(() => assertCleanTree(dir)).toThrow(/not clean/i);
  });
  it("assertHasCommits throws in an empty repo, passes once committed", () => {
    const empty = mkdtempSync(join(tmpdir(), "empty-"));
    execSync("git init", { cwd: empty, stdio: "ignore" });
    expect(() => assertHasCommits(empty)).toThrow(/at least one commit/i);
    expect(() => assertHasCommits(gitRepo())).not.toThrow();
  });
  it("branchExists reflects branch presence", () => {
    const dir = gitRepo();
    expect(branchExists(dir, "adopt/standard")).toBe(false);
    createBranch(dir, "adopt/standard");
    expect(branchExists(dir, "adopt/standard")).toBe(true);
  });
});
