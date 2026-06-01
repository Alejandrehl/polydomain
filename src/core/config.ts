import type {
  ActionsPlatform,
  AgentId,
  DomainPreset,
  InitConfig,
  ReferencesType,
} from "./types.js";

const PRESETS: Record<DomainPreset, string[]> = {
  minimal: ["work"],
  standard: ["work", "side-project"],
  full: ["work", "side-project", "personal", "home"],
};
export function resolveDomains(spec: string): string[] {
  if (spec in PRESETS) return PRESETS[spec as DomainPreset];
  return spec
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
export interface InitOptions {
  dir: string;
  agents: AgentId[];
  domains?: string;
  includeReferences?: boolean;
  references?: string;
  actions?: string;
  includeMemory?: boolean;
  gitInit?: boolean;
  force?: boolean;
}
function resolveReferences(o: InitOptions): ReferencesType | null {
  if (o.references != null && o.references !== "") {
    if (o.references !== "notes" && o.references !== "obsidian") {
      throw new Error(
        `Unknown references type: "${o.references}". Valid: notes, obsidian`,
      );
    }
    return o.references;
  }
  return o.includeReferences ? "notes" : null;
}
function resolveActions(o: InitOptions): ActionsPlatform | null {
  if (o.actions != null && o.actions !== "") {
    if (o.actions !== "macos") {
      throw new Error(`Unknown actions platform: "${o.actions}". Valid: macos`);
    }
    return o.actions;
  }
  return null;
}
export function resolveInitConfig(o: InitOptions): InitConfig {
  return {
    dir: o.dir,
    agents: o.agents,
    domains: resolveDomains(o.domains ?? "standard"),
    references: resolveReferences(o),
    actions: resolveActions(o),
    includeMemory: o.includeMemory ?? true,
    gitInit: o.gitInit ?? true,
    force: o.force ?? false,
  };
}
