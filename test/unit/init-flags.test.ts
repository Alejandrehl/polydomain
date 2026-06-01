import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { runInit } from "../../src/commands/init.js";

describe("runInit (non-interactive with --yes)", () => {
  it("scaffolds a standard center without prompting", async () => {
    const dir = join(mkdtempSync(join(tmpdir(), "cd-")), "my-center");
    await runInit({ dir, yes: true, agent: "claude", noGit: true });
    expect(existsSync(join(dir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(join(dir, "domains/work.md"))).toBe(true);
    expect(readFileSync(join(dir, "CLAUDE.md"), "utf8")).toContain("my-center");
  });
  it("rejects an unknown agent id", async () => {
    const dir = join(mkdtempSync(join(tmpdir(), "cd-")), "c");
    await expect(
      runInit({ dir, yes: true, agent: "bogus", noGit: true }),
    ).rejects.toThrow(/unknown agent/i);
  });
  it("--no-memory omits the memory system end-to-end (flag plumbing)", async () => {
    const dir = join(mkdtempSync(join(tmpdir(), "cd-")), "no-mem");
    await runInit({
      dir,
      yes: true,
      agent: "claude",
      noMemory: true,
      noGit: true,
    });
    expect(existsSync(join(dir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(join(dir, "memory/MEMORY.md"))).toBe(false);
    expect(existsSync(join(dir, "memory/_how-memory-works.md"))).toBe(false);
  });
  it("scaffolds the cursor agent's nested-dir entrypoint", async () => {
    const dir = join(mkdtempSync(join(tmpdir(), "cd-")), "cursor-center");
    await runInit({ dir, yes: true, agent: "cursor", noGit: true });
    expect(existsSync(join(dir, ".cursor/rules/command-center.mdc"))).toBe(
      true,
    );
  });
});
