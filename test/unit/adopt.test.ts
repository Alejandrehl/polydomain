import { execSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { adoptInRepo } from "../../src/commands/adopt.js";

function gitRepo(): string {
  const dir = mkdtempSync(join(tmpdir(), "adopt-"));
  execSync("git init", { cwd: dir, stdio: "ignore" });
  execSync("git config user.email t@t && git config user.name t", {
    cwd: dir,
    stdio: "ignore",
  });
  execSync("git commit --allow-empty -m init", { cwd: dir, stdio: "ignore" });
  return dir;
}
const branch = (dir: string) =>
  execSync("git rev-parse --abbrev-ref HEAD", {
    cwd: dir,
    encoding: "utf8",
  }).trim();

describe("adoptInRepo", () => {
  it("on a clean repo: creates the branch and writes MIGRATION.md uncommitted, nothing else", () => {
    const dir = gitRepo();
    adoptInRepo(dir);
    expect(branch(dir)).toBe("adopt/standard");
    expect(existsSync(join(dir, "MIGRATION.md"))).toBe(true);
    expect(readFileSync(join(dir, "MIGRATION.md"), "utf8")).toContain(
      "Adopt the polydomain standard",
    );
    expect(existsSync(join(dir, "governance.md"))).toBe(false);
    expect(existsSync(join(dir, "SECURITY.md"))).toBe(false);
    // adopt must never commit: MIGRATION.md stays untracked.
    const status = execSync("git status --porcelain", {
      cwd: dir,
      encoding: "utf8",
    });
    expect(status).toContain("?? MIGRATION.md");
  });
  it("fails in a repo with no commits", () => {
    const dir = mkdtempSync(join(tmpdir(), "adopt-empty-"));
    execSync("git init", { cwd: dir, stdio: "ignore" });
    expect(() => adoptInRepo(dir)).toThrow(/at least one commit/i);
  });
  it("refuses to overwrite an existing (untracked) MIGRATION.md", () => {
    const dir = gitRepo();
    writeFileSync(join(dir, "MIGRATION.md"), "OLD CONTENT");
    expect(() => adoptInRepo(dir)).toThrow(/MIGRATION\.md already exists/i);
    // untouched + no branch created
    expect(readFileSync(join(dir, "MIGRATION.md"), "utf8")).toBe("OLD CONTENT");
    expect(branch(dir)).not.toBe("adopt/standard");
  });
  it("fails in a non-git dir", () => {
    const dir = mkdtempSync(join(tmpdir(), "plain-"));
    expect(() => adoptInRepo(dir)).toThrow(/needs a git repository/i);
  });
  it("fails on a dirty tree", () => {
    const dir = gitRepo();
    writeFileSync(join(dir, "a.txt"), "x");
    execSync("git add a.txt", { cwd: dir, stdio: "ignore" });
    expect(() => adoptInRepo(dir)).toThrow(/not clean/i);
  });
  it("fails when the adopt/standard branch already exists", () => {
    const dir = gitRepo();
    execSync("git branch adopt/standard", { cwd: dir, stdio: "ignore" });
    expect(() => adoptInRepo(dir)).toThrow(/already exists/i);
  });
});
