import type { AgentId } from "./types.js";

const MAP: Record<AgentId, string> = {
  claude: "CLAUDE.md",
  codex: "AGENTS.md",
  gemini: "GEMINI.md",
  cursor: ".cursor/rules/command-center.mdc",
};
export function entrypointPath(agent: AgentId): string {
  return MAP[agent];
}
export const ALL_AGENTS: AgentId[] = ["claude", "codex", "gemini", "cursor"];
