import { resolveInitConfig } from "../core/config.js";
import { entrypointPath } from "../core/entrypoints.js";
import { scaffold } from "../core/scaffold.js";
import type { AgentId } from "../core/types.js";
import { askAgents, intro, nextSteps } from "../ui/prompts.js";

export interface InitCliOptions {
  dir: string;
  yes?: boolean;
  agent?: string;
  domains?: string;
  withReferences?: boolean;
  noMemory?: boolean;
  noGit?: boolean;
  force?: boolean;
}

function parseAgents(spec?: string): AgentId[] {
  if (!spec) return ["claude"];
  return spec
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as AgentId[];
}

export async function runInit(o: InitCliOptions): Promise<void> {
  let agents: AgentId[];
  if (o.yes) {
    agents = parseAgents(o.agent);
  } else {
    intro();
    agents = o.agent ? parseAgents(o.agent) : await askAgents();
  }
  const cfg = resolveInitConfig({
    dir: o.dir,
    agents,
    domains: o.domains,
    includeReferences: o.withReferences,
    includeMemory: o.noMemory ? false : undefined,
    gitInit: o.noGit ? false : undefined,
    force: o.force,
  });
  scaffold(cfg);
  // Guard: agents[0] is AgentId | undefined under noUncheckedIndexedAccess
  const primary: AgentId | undefined = agents[0];
  if (!o.yes && primary !== undefined)
    nextSteps(o.dir, entrypointPath(primary));
}
