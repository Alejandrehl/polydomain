import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addAgentTo } from "../../src/commands/add-agent.js";

function makeCenter(): string {
  const dir = mkdtempSync(join(tmpdir(), "cd-"));
  mkdirSync(join(dir, "domains"), { recursive: true });
  writeFileSync(join(dir, "domains/_registry.md"), "| Domain |\n");
  return dir;
}

describe("addAgentTo", () => {
  it("writes the entrypoint for the requested agent", () => {
    const dir = makeCenter();
    addAgentTo(dir, "gemini");
    expect(existsSync(join(dir, "GEMINI.md"))).toBe(true);
  });
  it("rejects an unknown agent", () => {
    const dir = makeCenter();
    expect(() => addAgentTo(dir, "bogus")).toThrow(/unknown agent/i);
  });
  it("throws if the entrypoint already exists", () => {
    const dir = makeCenter();
    addAgentTo(dir, "gemini");
    expect(() => addAgentTo(dir, "gemini")).toThrow(/already exists/i);
  });
  it("throws when not in a command center (no registry)", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    expect(() => addAgentTo(dir, "gemini")).toThrow(/not a command center/i);
  });
});
