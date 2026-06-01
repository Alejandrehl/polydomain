import { chmodSync, existsSync, mkdtempSync, writeFileSync } from "node:fs";
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
    expect(m).not.toHaveProperty("references/notes-store.md");
    expect(m).not.toHaveProperty("references/obsidian.md");
    expect(m).not.toHaveProperty("references/external-store.md");
  });
  it("references:notes emits notes-store only; obsidian emits both; external-store never", () => {
    const notes = buildFileMap(cfg({ domains: "full", references: "notes" }));
    expect(notes).toHaveProperty("references/notes-store.md");
    expect(notes).not.toHaveProperty("references/obsidian.md");
    expect(notes).not.toHaveProperty("references/external-store.md");
    const obs = buildFileMap(cfg({ references: "obsidian" }));
    expect(obs).toHaveProperty("references/notes-store.md");
    expect(obs).toHaveProperty("references/obsidian.md");
  });
  it("--with-references (includeReferences) is an alias for references:notes", () => {
    const m = buildFileMap(cfg({ includeReferences: true }));
    expect(m).toHaveProperty("references/notes-store.md");
    expect(m).not.toHaveProperty("references/obsidian.md");
  });
  it("rejects an unknown references type", () => {
    expect(() => cfg({ references: "bogus" })).toThrow(
      /unknown references type/i,
    );
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
  it("runs git init when gitInit is set", () => {
    const dir = mkdtempSync(join(tmpdir(), "cd-"));
    scaffold(resolveInitConfig({ dir, agents: ["claude"], gitInit: true }));
    expect(existsSync(join(dir, ".git"))).toBe(true);
  });
  it("gives a friendly error when the target can't be written", () => {
    // root ignores file permissions, so this check can't be exercised as root
    if (typeof process.getuid === "function" && process.getuid() === 0) return;
    const parent = mkdtempSync(join(tmpdir(), "ro-"));
    chmodSync(parent, 0o555);
    try {
      expect(() =>
        scaffold(
          resolveInitConfig({
            dir: join(parent, "sub"),
            agents: ["claude"],
            gitInit: false,
          }),
        ),
      ).toThrow(/permission denied/i);
    } finally {
      chmodSync(parent, 0o755);
    }
  });
  it("registry lists exactly the generated domains (standard)", () => {
    const reg = buildFileMap(cfg())["domains/_registry.md"];
    expect(reg).toContain("`domains/work.md`");
    expect(reg).toContain("`domains/side-project.md`");
    expect(reg).not.toContain("`domains/personal.md`");
    expect(reg).not.toContain("`domains/home.md`");
  });
  it("includes the memory protocol file when memory is on, omits with --no-memory", () => {
    expect(buildFileMap(cfg())).toHaveProperty("memory/_how-memory-works.md");
    expect(buildFileMap(cfg({ includeMemory: false }))).not.toHaveProperty(
      "memory/_how-memory-works.md",
    );
  });
  it("always includes the example capsule, and it is NOT in the registry", () => {
    const m = buildFileMap(cfg());
    expect(m).toHaveProperty("domains/_example.md");
    expect(m["domains/_registry.md"]).not.toContain("_example.md");
  });
  it("registry lists all four domains under the full preset", () => {
    const reg = buildFileMap(cfg({ domains: "full" }))["domains/_registry.md"];
    for (const d of ["work", "side-project", "personal", "home"]) {
      expect(reg).toContain(`\`domains/${d}.md\``);
    }
  });
});
