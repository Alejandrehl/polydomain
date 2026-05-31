import { describe, expect, it } from "vitest";
import { entrypointPath } from "../../src/core/entrypoints.js";

describe("entrypointPath", () => {
  it("maps each agent to its required filename", () => {
    expect(entrypointPath("claude")).toBe("CLAUDE.md");
    expect(entrypointPath("codex")).toBe("AGENTS.md");
    expect(entrypointPath("gemini")).toBe("GEMINI.md");
    expect(entrypointPath("cursor")).toBe(".cursor/rules/command-center.mdc");
  });
});
