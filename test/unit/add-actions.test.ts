import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addActionsTo } from "../../src/commands/add-actions.js";

function center(): string {
  const dir = mkdtempSync(join(tmpdir(), "act-"));
  mkdirSync(join(dir, "domains"), { recursive: true });
  writeFileSync(join(dir, "domains/_registry.md"), "# registry\n", "utf8");
  return dir;
}

describe("addActionsTo", () => {
  it("adds actions/macos.md in a center", () => {
    const dir = center();
    addActionsTo(dir, "macos");
    expect(existsSync(join(dir, "actions/macos.md"))).toBe(true);
  });
  it("rejects an unknown platform", () => {
    expect(() => addActionsTo(center(), "windows")).toThrow(
      /unknown actions platform/i,
    );
  });
  it("fails outside a command center", () => {
    const bare = mkdtempSync(join(tmpdir(), "bare-"));
    expect(() => addActionsTo(bare, "macos")).toThrow(/not a command center/i);
  });
  it("refuses to overwrite an existing capsule", () => {
    const dir = center();
    addActionsTo(dir, "macos");
    expect(() => addActionsTo(dir, "macos")).toThrow(/already exists/i);
  });
});
