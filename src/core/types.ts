export type AgentId = "claude" | "codex" | "gemini" | "cursor";
export type DomainPreset = "minimal" | "standard" | "full";
export type ReferencesType = "notes" | "obsidian";
export type ActionsPlatform = "macos";
export interface InitConfig {
  dir: string;
  agents: AgentId[];
  domains: string[];
  references: ReferencesType | null;
  actions: ActionsPlatform | null;
  includeMemory: boolean;
  gitInit: boolean;
  force: boolean;
}
