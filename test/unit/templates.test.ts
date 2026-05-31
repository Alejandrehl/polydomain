import { describe, expect, it } from "vitest";
import { CAPSULES, REGISTRY } from "../../src/templates/domains.js";
import { FIXED } from "../../src/templates/fixed.js";
import { ROUTER } from "../../src/templates/router.js";

describe("router template", () => {
  it("ships the security rules active by default", () => {
    expect(ROUTER).toMatch(/plan → review → approve → execute/i);
    expect(ROUTER).toMatch(/confidentiality isolation/i);
  });
  it("has the name token and points to the registry", () => {
    expect(ROUTER).toContain("{{name}}");
    expect(ROUTER).toContain("domains/_registry.md");
  });
});
describe("domain templates", () => {
  it("ships the four generic example capsules", () => {
    expect(Object.keys(CAPSULES).sort()).toEqual([
      "home",
      "personal",
      "side-project",
      "work",
    ]);
  });
  it("each capsule declares entry point, state, rules, permissions", () => {
    for (const md of Object.values(CAPSULES)) {
      expect(md).toMatch(/entry point/i);
      expect(md).toMatch(/permission/i);
    }
  });
  it("registry is a table with a name token", () => {
    expect(REGISTRY).toContain("{{name}}");
    expect(REGISTRY).toMatch(/\| Domain \|/);
  });
});
describe("fixed templates", () => {
  it("provides all fixed files", () => {
    for (const k of [
      "memoryIndex",
      "governance",
      "guide",
      "security",
      "readme",
      "gitignore",
      "externalStore",
    ]) {
      expect(FIXED).toHaveProperty(k);
      const value = (FIXED as Record<string, string>)[k];
      expect(value?.length).toBeGreaterThan(0);
    }
  });
  it("SECURITY warns against committing secrets", () => {
    expect(FIXED.security).toMatch(/secret/i);
    expect(FIXED.security).toMatch(/context, not a vault/i);
  });
  it("gitignore ignores common secret files", () => {
    expect(FIXED.gitignore).toMatch(/\.env/);
  });
});
