import { describe, expect, it } from "vitest";
import { render } from "../../src/core/tokens.js";
import {
  CAPSULES,
  EXAMPLE_CAPSULE,
  REGISTRY,
} from "../../src/templates/domains.js";
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
      "memoryProtocol",
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
describe("guide + external store reframe", () => {
  it("guide frames the command center as an orchestrator with a first-session step", () => {
    const g = FIXED.guide;
    expect(g).toMatch(/orchestrate everything/i);
    expect(g).toMatch(/your first session/i);
    expect(g).toMatch(/help me set up/i);
    expect(g).toContain("_how-memory-works.md");
    expect(g).toContain("domains/_example.md");
  });
  it("external store is read AND write (capture notes/analysis)", () => {
    expect(FIXED.externalStore).toMatch(/reads and writes/i);
    expect(FIXED.externalStore).toMatch(/\*\*write\*\* notes/i);
  });
});
describe("example capsule template", () => {
  it("is a filled model, not a live domain, and shows orchestration", () => {
    const e = EXAMPLE_CAPSULE;
    expect(e).toMatch(/not a live domain/i);
    expect(e).toMatch(/delete it or adapt/i);
    expect(e).toMatch(/external repo/i);
    expect(e).toMatch(/external notes store/i);
    expect(e).toMatch(/read and write there/i);
    for (const s of [
      "Where it lives",
      "Rules",
      "Permissions",
      "Recent state",
    ]) {
      expect(e).toContain(s);
    }
  });
});
describe("router onboarding + memory", () => {
  it("points memory to the protocol file", () => {
    expect(ROUTER).toContain("memory/_how-memory-works.md");
  });
  it("has a user-triggered onboarding section", () => {
    expect(ROUTER).toMatch(/## 6\. Onboarding/);
    expect(ROUTER).toMatch(/if the user asks you to help/i);
    expect(ROUTER).toContain("domains/_example.md");
  });
});
describe("memory protocol template", () => {
  it("teaches the protocol: types, frontmatter, when-not, recall, canonical/in-repo, privacy", () => {
    const m = FIXED.memoryProtocol;
    expect(m).toMatch(/one durable fact per file/i);
    expect(m).toContain("type: user | feedback | project | reference");
    for (const t of ["user", "feedback", "project", "reference"])
      expect(m).toMatch(new RegExp(`- \\*\\*${t}\\*\\* —`));
    expect(m).toMatch(/description:/);
    expect(m).toMatch(/don't.*derivable from code/i);
    expect(m).toMatch(/MEMORY\.md is the index/i);
    expect(m).toMatch(/canonical/i);
    expect(m).toMatch(/privacy/i);
  });
  it("MEMORY.md index points to the protocol", () => {
    expect(FIXED.memoryIndex).toContain("_how-memory-works.md");
    expect(FIXED.memoryIndex).toContain("{{name}}");
  });
});
describe("render leaves non-{{}} placeholders untouched", () => {
  it("keeps polydomain literal and substitutes {{name}} in the readme", () => {
    const out = render(FIXED.readme, { name: "myteam" });
    expect(out).toContain("polydomain"); // tool name is plain prose — render() only touches {{...}} tokens
    expect(out).toContain("CLAUDE.md"); // entrypoint example is plain prose
    expect(out).toContain("myteam"); // {{name}} was substituted
    expect(out).not.toContain("{{name}}");
  });
});
