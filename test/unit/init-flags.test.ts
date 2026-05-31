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
});
