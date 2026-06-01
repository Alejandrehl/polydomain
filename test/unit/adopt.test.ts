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
  it("on a clean repo: creates the branch and writes MIGRATION.md, nothing else", () => {
    const dir = gitRepo();
    adoptInRepo(dir);
    expect(branch(dir)).toBe("adopt/standard");
    expect(existsSync(join(dir, "MIGRATION.md"))).toBe(true);
    expect(readFileSync(join(dir, "MIGRATION.md"), "utf8")).toContain(
      "Adopt the polydomain standard",
    );
    expect(existsSync(join(dir, "governance.md"))).toBe(false);
    expect(existsSync(join(dir, "SECURITY.md"))).toBe(false);
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
