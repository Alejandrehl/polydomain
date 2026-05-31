import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ensureEmpty, writeTree } from "../../src/core/fs-safe.js";

describe("ensureEmpty", () => {
  it("passes for a missing dir", () => {
    const d = join(mkdtempSync(join(tmpdir(), "cd-")), "new");
    expect(() => ensureEmpty(d, false)).not.toThrow();
  });
  it("throws for a non-empty dir without force", () => {
    const d = mkdtempSync(join(tmpdir(), "cd-"));
    writeFileSync(join(d, "x.txt"), "x");
    expect(() => ensureEmpty(d, false)).toThrow(/not empty/);
  });
  it("passes for a non-empty dir with force", () => {
    const d = mkdtempSync(join(tmpdir(), "cd-"));
    writeFileSync(join(d, "x.txt"), "x");
    expect(() => ensureEmpty(d, true)).not.toThrow();
  });
});
describe("writeTree", () => {
  it("writes nested files creating dirs", () => {
    const d = mkdtempSync(join(tmpdir(), "cd-"));
    writeTree(d, { "a/b.md": "hello", "c.md": "world" });
    expect(readFileSync(join(d, "a/b.md"), "utf8")).toBe("hello");
    expect(readFileSync(join(d, "c.md"), "utf8")).toBe("world");
  });
});
