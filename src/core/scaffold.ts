import { execSync } from "node:child_process";
import { basename } from "node:path";
import { CAPSULES, genericCapsule, REGISTRY } from "../templates/domains.js";
import { FIXED } from "../templates/fixed.js";
import { ROUTER } from "../templates/router.js";
import { entrypointPath } from "./entrypoints.js";
import { ensureEmpty, writeTree } from "./fs-safe.js";
import { render } from "./tokens.js";
import type { InitConfig } from "./types.js";

export function assertSafeDomainName(name: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(name)) {
    throw new Error(
      `Invalid domain name: "${name}" (letters, digits, hyphens only; no slashes or dots)`,
    );
  }
}

export function buildFileMap(cfg: InitConfig): Record<string, string> {
  const name = basename(cfg.dir);
  const v = { name };
  const files: Record<string, string> = {};

  for (const agent of cfg.agents)
    files[entrypointPath(agent)] = render(ROUTER, v);

  files["domains/_registry.md"] = render(REGISTRY, v);
  for (const d of cfg.domains) {
    assertSafeDomainName(d);
    const md = CAPSULES[d] ?? genericCapsule(d);
    files[`domains/${d}.md`] = render(md, v);
  }

  files["governance.md"] = render(FIXED.governance, v);
  files["GUIDE.md"] = render(FIXED.guide, v);
  files["SECURITY.md"] = render(FIXED.security, v);
  files["README.md"] = render(FIXED.readme, v);
  files[".gitignore"] = FIXED.gitignore;

  files["workspace/.gitkeep"] = "";
  if (cfg.includeMemory)
    files["memory/MEMORY.md"] = render(FIXED.memoryIndex, v);
  if (cfg.includeReferences)
    files["references/external-store.md"] = render(FIXED.externalStore, v);

  return files;
}

export function scaffold(cfg: InitConfig): void {
  ensureEmpty(cfg.dir, cfg.force);
  writeTree(cfg.dir, buildFileMap(cfg));
  if (cfg.gitInit) {
    try {
      execSync("git init", { cwd: cfg.dir, stdio: "ignore" });
    } catch {
      /* git is optional; scaffolding still succeeds without it */
    }
  }
}
