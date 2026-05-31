import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveInitConfig } from "../../src/core/config.js";
import { buildFileMap, scaffold } from "../../src/core/scaffold.js";

const cfg = (over = {}) =>
  resolveInitConfig({ dir: "x", agents: ["claude"], ...over });

describe("buildFileMap", () => {
  it("always includes router, registry, memory, governance, guide, security, gitignore, readme", () => {
    const m = buildFileMap(cfg());
    for (const p of [
      "CLAUDE.md",
      "domains/_registry.md",
      "memory/MEMORY.md",
      "governance.md",
      "GUIDE.md",
      "SECURITY.md",
      ".gitignore",
      "README.md",
    ]) {
      expect(m).toHaveProperty(p);
    }
  });
  it("default standard emits only work + side-project capsules, no references", () => {
    const m = buildFileMap(cfg());
    expect(m).toHaveProperty("domains/work.md");
    expect(m).toHaveProperty("domains/side-project.md");
    expect(m).not.toHaveProperty("domains/personal.md");
    expect(m).not.toHaveProperty("references/external-store.md");
  });
  it("full + references emits all capsules and the reference", () => {
    const m = buildFileMap(cfg({ domains: "full", includeReferences: true }));
    expect(m).toHaveProperty("domains/personal.md");
    expect(m).toHaveProperty("domains/home.md");
    expect(m).toHaveProperty("references/external-store.md");
  });
  it("renders an entrypoint per agent", () => {
    const m = buildFileMap(cfg({ agents: ["claude", "gemini"] }));
    expect(m).toHaveProperty("CLAUDE.md");
    expect(m).toHaveProperty("GEMINI.md");
  });
  it("substitutes the {{name}} token using the dir basename", () => {
    const m = buildFileMap(
      resolveInitConfig({ dir: "/tmp/my-center", agents: ["claude"] }),
    );
    expect(m["CLAUDE.md"]).toContain("my-center");
    expect(m["CLAUDE.md"]).not.toContain("{{name}}");
  });
  it("omits memory files when includeMemory is false", () => {
    const m = buildFileMap(cfg({ includeMemory: false }));
    expect(m).not.toHaveProperty("memory/MEMORY.md");
  });
  it("always includes workspace/.gitkeep", () => {
    const m = buildFileMap(cfg());
    expect(m).toHaveProperty("workspace/.gitkeep");
  });
  it("rejects an unsafe domain name", () => {
    expect(() => buildFileMap(cfg({ domains: "../evil" }))).toThrow(
      /invalid domain name/i,
    );
  });
  it("scaffold writes into a non-empty dir when force is set", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    writeFileSync(join(dir, "x.txt"), "x");
    scaffold(
      resolveInitConfig({
        dir,
        agents: ["claude"],
        force: true,
        gitInit: false,
      }),
    );
    expect(existsSync(join(dir, "CLAUDE.md"))).toBe(true);
  });
  it("scaffold refuses a non-empty dir without force", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    writeFileSync(join(dir, "x.txt"), "x");
    expect(() =>
      scaffold(resolveInitConfig({ dir, agents: ["claude"], gitInit: false })),
    ).toThrow(/not empty/);
  });
  it("registry lists exactly the generated domains (standard)", () => {
    const reg = buildFileMap(cfg())["domains/_registry.md"];
    expect(reg).toContain("`domains/work.md`");
    expect(reg).toContain("`domains/side-project.md`");
    expect(reg).not.toContain("`domains/personal.md`");
    expect(reg).not.toContain("`domains/home.md`");
  });
  it("registry lists all four domains under the full preset", () => {
    const reg = buildFileMap(cfg({ domains: "full" }))["domains/_registry.md"];
    for (const d of ["work", "side-project", "personal", "home"]) {
      expect(reg).toContain(`\`domains/${d}.md\``);
    }
  });
});
