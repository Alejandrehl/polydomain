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
      "notesStore",
      "obsidian",
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
describe("guide reframe", () => {
  it("guide frames the command center as an orchestrator with a first-session step", () => {
    const g = FIXED.guide;
    expect(g).toMatch(/orchestrate everything/i);
    expect(g).toMatch(/your first session/i);
    expect(g).toMatch(/help me set up/i);
    expect(g).toContain("_how-memory-works.md");
    expect(g).toContain("domains/_example.md");
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
describe("notes-store template", () => {
  it("teaches index hierarchy, frontmatter, the four ops, promotion, write posture, degradation, security", () => {
    const m = FIXED.notesStore;
    expect(m).toMatch(/three reads per question/i);
    expect(m).toContain("_index.md");
    expect(m).toContain("type: source | concept | entity | synthesis | index");
    expect(m).toMatch(/confidence: high \| medium \| low/);
    for (const op of ["CAPTURE", "COMPILE", "QUERY", "AUDIT"])
      expect(m).toMatch(new RegExp(`\\*\\*${op}\\*\\*`));
    expect(m).toMatch(/reflect and link.{0,4}don't copy/i);
    expect(m).toMatch(/confirm before writing/i);
    expect(m).toMatch(/unavailable/i);
    expect(m).toMatch(/never invent/i);
    expect(m).toMatch(/secret/i);
  });
});
describe("obsidian template", () => {
  it("adds wikilinks, vault root, sync degradation, optional MCP, security", () => {
    const o = FIXED.obsidian;
    expect(o).toContain("[[note-name]]");
    expect(o).toMatch(/bidirectional/i);
    expect(o).toMatch(/~\/vault\//);
    expect(o).toMatch(/MCP server/i);
    expect(o).toMatch(/not required|optional/i);
    expect(o).toMatch(/model provider/i);
  });
});
describe("router + governance notes-store wiring", () => {
  it("router onboarding mentions connecting a notes store with audit/generate", () => {
    expect(ROUTER).toMatch(/notes store/i);
    expect(ROUTER).toMatch(/add reference/i);
    expect(ROUTER).toMatch(/audit/i);
    expect(ROUTER).toMatch(/generate/i);
  });
  it("governance states the standard and the memory vs notes-store boundary", () => {
    expect(FIXED.governance).toMatch(/polydomain standard/i);
    expect(FIXED.governance).toMatch(/every session.{0,40}memory/i);
    expect(FIXED.governance).toMatch(/notes store/i);
  });
  it("guide has a connect-your-notes-store step", () => {
    expect(FIXED.guide).toMatch(/notes store/i);
    expect(FIXED.guide).toContain("--references obsidian");
  });
});
