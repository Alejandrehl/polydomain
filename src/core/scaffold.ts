import { execSync } from "node:child_process";
import { basename } from "node:path";
import {
  CAPSULES,
  EXAMPLE_CAPSULE,
  genericCapsule,
  REGISTRY,
  registryRow,
} from "../templates/domains.js";
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

  for (const d of cfg.domains) assertSafeDomainName(d);

  files["domains/_registry.md"] =
    render(REGISTRY, v) + cfg.domains.map(registryRow).join("");

  for (const d of cfg.domains) {
    const md = CAPSULES[d] ?? genericCapsule(d);
    files[`domains/${d}.md`] = render(md, v);
  }

  // after the per-domain loop, before governance:
  files["domains/_example.md"] = render(EXAMPLE_CAPSULE, v);

  files["governance.md"] = render(FIXED.governance, v);
  files["GUIDE.md"] = render(FIXED.guide, v);
  files["SECURITY.md"] = render(FIXED.security, v);
  files["README.md"] = render(FIXED.readme, v);
  files[".gitignore"] = FIXED.gitignore;

  files["workspace/.gitkeep"] = "";
  if (cfg.includeMemory) {
    files["memory/MEMORY.md"] = render(FIXED.memoryIndex, v);
    files["memory/_how-memory-works.md"] = render(FIXED.memoryProtocol, v);
  }
  if (cfg.references) {
    files["references/notes-store.md"] = render(FIXED.notesStore, v);
    if (cfg.references === "obsidian")
      files["references/obsidian.md"] = render(FIXED.obsidian, v);
  }

  return files;
}

export function scaffold(cfg: InitConfig): void {
  ensureEmpty(cfg.dir, cfg.force);
  try {
    writeTree(cfg.dir, buildFileMap(cfg));
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === "EACCES" || code === "EPERM") {
      throw new Error(`Cannot write to ${cfg.dir}: permission denied.`);
    }
    throw e;
  }
  if (cfg.gitInit) {
    try {
      execSync("git init", { cwd: cfg.dir, stdio: "ignore" });
    } catch {
      /* git is optional; scaffolding still succeeds without it */
    }
  }
}
