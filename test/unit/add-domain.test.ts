import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addDomainTo } from "../../src/commands/add-domain.js";

describe("addDomainTo", () => {
  it("creates a capsule and appends a registry row", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    mkdirSync(join(dir, "domains"), { recursive: true });
    writeFileSync(
      join(dir, "domains/_registry.md"),
      "| Domain | Lives in | Capsule |\n|---|---|---|\n",
    );
    addDomainTo(dir, "clients");
    expect(existsSync(join(dir, "domains/clients.md"))).toBe(true);
    expect(readFileSync(join(dir, "domains/_registry.md"), "utf8")).toContain(
      "domains/clients.md",
    );
  });
  it("refuses to overwrite an existing capsule", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    mkdirSync(join(dir, "domains"), { recursive: true });
    writeFileSync(join(dir, "domains/_registry.md"), "| Domain |\n");
    writeFileSync(join(dir, "domains/x.md"), "exists");
    expect(() => addDomainTo(dir, "x")).toThrow(/exists/i);
  });
});
