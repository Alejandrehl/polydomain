import { resolveInitConfig } from "../core/config.js";
import { ALL_AGENTS, entrypointPath } from "../core/entrypoints.js";
import { scaffold } from "../core/scaffold.js";
import type { AgentId } from "../core/types.js";
import { askAgents, intro, nextSteps } from "../ui/prompts.js";

export interface InitCliOptions {
  dir: string;
  yes?: boolean;
  agent?: string;
  domains?: string;
  withReferences?: boolean;
  references?: string;
  actions?: string;
  noMemory?: boolean;
  noGit?: boolean;
  force?: boolean;
}

function parseAgents(spec?: string): AgentId[] {
  if (!spec) return ["claude"];
  const ids = spec
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const invalid = ids.filter((a) => !ALL_AGENTS.includes(a as AgentId));
  if (invalid.length) {
    throw new Error(
      `Unknown agent(s): ${invalid.join(", ")} (valid: ${ALL_AGENTS.join(", ")})`,
    );
  }
  return ids as AgentId[];
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
    references: o.references,
    actions: o.actions,
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
