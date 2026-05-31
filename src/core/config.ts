import type { AgentId, DomainPreset, InitConfig } from "./types.js";
const PRESETS: Record<DomainPreset, string[]> = {
  minimal: ["work"],
  standard: ["work", "side-project"],
  full: ["work", "side-project", "personal", "home"],
};
export function resolveDomains(spec: string): string[] {
  if (spec in PRESETS) return PRESETS[spec as DomainPreset];
  return spec.split(",").map((s) => s.trim()).filter(Boolean);
}
export interface InitOptions {
  dir: string;
  agents: AgentId[];
  domains?: string;
  includeReferences?: boolean;
  includeMemory?: boolean;
  gitInit?: boolean;
  force?: boolean;
}
export function resolveInitConfig(o: InitOptions): InitConfig {
  return {
    dir: o.dir,
    agents: o.agents,
    domains: resolveDomains(o.domains ?? "standard"),
    includeReferences: o.includeReferences ?? false,
    includeMemory: o.includeMemory ?? true,
    gitInit: o.gitInit ?? true,
    force: o.force ?? false,
  };
}
