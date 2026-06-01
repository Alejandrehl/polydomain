import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addReferenceTo } from "../../src/commands/add-reference.js";

function center(): string {
  const dir = mkdtempSync(join(tmpdir(), "ref-"));
  mkdirSync(join(dir, "domains"), { recursive: true });
  writeFileSync(join(dir, "domains/_registry.md"), "# registry\n", "utf8");
  return dir;
}

describe("addReferenceTo", () => {
  it("adds obsidian (core + specialization) in a center", () => {
    const dir = center();
    addReferenceTo(dir, "obsidian");
    expect(existsSync(join(dir, "references/notes-store.md"))).toBe(true);
    expect(existsSync(join(dir, "references/obsidian.md"))).toBe(true);
  });
  it("adds notes (core only)", () => {
    const dir = center();
    addReferenceTo(dir, "notes");
    expect(existsSync(join(dir, "references/notes-store.md"))).toBe(true);
    expect(existsSync(join(dir, "references/obsidian.md"))).toBe(false);
  });
  it("rejects an unknown type", () => {
    expect(() => addReferenceTo(center(), "bogus")).toThrow(
      /unknown references type/i,
    );
  });
  it("fails outside a command center", () => {
    const bare = mkdtempSync(join(tmpdir(), "bare-"));
    expect(() => addReferenceTo(bare, "notes")).toThrow(
      /not a command center/i,
    );
  });
});
