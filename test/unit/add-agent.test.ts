import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addAgentTo } from "../../src/commands/add-agent.js";

describe("addAgentTo", () => {
  it("writes the entrypoint for the requested agent", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    addAgentTo(dir, "gemini");
    expect(existsSync(join(dir, "GEMINI.md"))).toBe(true);
  });
  it("rejects an unknown agent", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    expect(() => addAgentTo(dir, "bogus")).toThrow(/unknown agent/i);
  });
});
