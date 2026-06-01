export type AgentId = "claude" | "codex" | "gemini" | "cursor";
export type DomainPreset = "minimal" | "standard" | "full";
export type ReferencesType = "notes" | "obsidian";
export interface InitConfig {
  dir: string;
  agents: AgentId[];
  domains: string[];
  references: ReferencesType | null;
  includeMemory: boolean;
  gitInit: boolean;
  force: boolean;
}
