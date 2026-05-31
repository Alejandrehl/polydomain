import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveInitConfig } from "../../src/core/config.js";
import { buildFileMap } from "../../src/core/scaffold.js";

function walk(dir: string, base = dir): Record<string, string> {
  const out: Record<string, string> = {};
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) Object.assign(out, walk(full, base));
    else out[relative(base, full)] = readFileSync(full, "utf8");
  }
  return out;
}

describe("examples/demo-center is not stale", () => {
  const committed = walk("examples/demo-center");
  const fresh = buildFileMap(
    resolveInitConfig({ dir: "examples/demo-center", agents: ["claude"] }),
  );
  it("has exactly the same set of files as a fresh standard build", () => {
    expect(Object.keys(committed).sort()).toEqual(Object.keys(fresh).sort());
  });
  it("has identical content for every file", () => {
    for (const [k, v] of Object.entries(fresh)) {
      expect(committed[k]).toBe(v);
    }
  });
});
