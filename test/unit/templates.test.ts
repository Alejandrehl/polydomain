import { describe, expect, it } from "vitest";
import { render } from "../../src/core/tokens.js";
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
      expect(md).toMatch(/## Rules/i);
    }
  });
  it("registry is a table with a name token", () => {
    expect(REGISTRY).toContain("{{name}}");
    expect(REGISTRY).toMatch(/\| Domain \|/);
  });
});
describe("fixed templates", () => {
  it("provides all fixed files", () => {
    const keys: (keyof typeof FIXED)[] = [
      "memoryIndex",
      "governance",
      "guide",
      "security",
      "readme",
      "gitignore",
      "externalStore",
    ];
    for (const k of keys) {
      expect(typeof FIXED[k]).toBe("string");
      expect(FIXED[k].length).toBeGreaterThan(0);
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
describe("render leaves non-{{}} placeholders untouched", () => {
  it("keeps <TOOL_NAME> literal and substitutes {{name}} in the readme", () => {
    const out = render(FIXED.readme, { name: "myteam" });
    expect(out).toContain("<TOOL_NAME>"); // brand token baked in a later phase, not by render()
    expect(out).toContain("CLAUDE.md"); // entrypoint example is plain prose
    expect(out).toContain("myteam"); // {{name}} was substituted
    expect(out).not.toContain("{{name}}");
  });
});
