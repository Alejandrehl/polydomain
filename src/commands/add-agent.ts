import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { ALL_AGENTS, entrypointPath } from "../core/entrypoints.js";
import { render } from "../core/tokens.js";
import type { AgentId } from "../core/types.js";
import { ROUTER } from "../templates/router.js";

export function addAgentTo(root: string, agent: string): void {
  if (!ALL_AGENTS.includes(agent as AgentId)) {
    throw new Error(
      `Unknown agent: ${agent} (valid: ${ALL_AGENTS.join(", ")})`,
    );
  }
  const rel = entrypointPath(agent as AgentId);
  const full = join(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  if (existsSync(full)) throw new Error(`Entrypoint already exists: ${rel}`);
  writeFileSync(full, render(ROUTER, { name: basename(root) }), "utf8");
}

export async function runAddAgent(agent: string): Promise<void> {
  addAgentTo(process.cwd(), agent);
  console.log(`Added entrypoint for "${agent}".`);
}
