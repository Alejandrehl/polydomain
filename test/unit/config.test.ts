import { describe, expect, it } from "vitest";
import { resolveDomains, resolveInitConfig } from "../../src/core/config.js";

describe("resolveDomains", () => {
  it("standard = work + side-project", () => {
    expect(resolveDomains("standard")).toEqual(["work", "side-project"]);
  });
  it("full = all four", () => {
    expect(resolveDomains("full")).toEqual([
      "work",
      "side-project",
      "personal",
      "home",
    ]);
  });
  it("minimal = single work domain", () => {
    expect(resolveDomains("minimal")).toEqual(["work"]);
  });
  it("accepts an explicit comma list", () => {
    expect(resolveDomains("work,home")).toEqual(["work", "home"]);
  });
  it("trims whitespace in the comma list", () => {
    expect(resolveDomains(" work , home ")).toEqual(["work", "home"]);
  });
  it("returns an empty list for an empty spec", () => {
    expect(resolveDomains("")).toEqual([]);
  });
});
describe("resolveInitConfig", () => {
  it("applies defaults when only dir+agents given", () => {
    const c = resolveInitConfig({ dir: "x", agents: ["claude"] });
    expect(c.dir).toBe("x");
    expect(c.domains).toEqual(["work", "side-project"]);
    expect(c.includeMemory).toBe(true);
    expect(c.includeReferences).toBe(false);
    expect(c.gitInit).toBe(true);
    expect(c.force).toBe(false);
  });
  it("honors overrides", () => {
    const c = resolveInitConfig({
      dir: "x",
      agents: ["claude"],
      domains: "full",
      includeReferences: true,
      includeMemory: false,
      gitInit: false,
      force: true,
    });
    expect(c.domains).toEqual(["work", "side-project", "personal", "home"]);
    expect(c.includeReferences).toBe(true);
    expect(c.includeMemory).toBe(false);
    expect(c.gitInit).toBe(false);
    expect(c.force).toBe(true);
  });
});
