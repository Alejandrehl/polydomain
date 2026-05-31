export type AgentId = "claude" | "codex" | "gemini" | "cursor";
export type DomainPreset = "minimal" | "standard" | "full";
export interface InitConfig {
  dir: string;
  agents: AgentId[];
  domains: string[];
  includeReferences: boolean;
  includeMemory: boolean;
  gitInit: boolean;
  force: boolean;
}
