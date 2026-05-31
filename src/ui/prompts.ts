import * as p from "@clack/prompts";
import { ALL_AGENTS } from "../core/entrypoints.js";
import type { AgentId } from "../core/types.js";
import { TOOL_NAME } from "../meta.js";

export function intro(): void {
  p.intro(`${TOOL_NAME} — command center`);
}

export async function askAgents(): Promise<AgentId[]> {
  const res = await p.multiselect({
    message: "Which agent(s) will operate this command center?",
    options: ALL_AGENTS.map((a) => ({ value: a, label: a })),
    initialValues: ["claude"] as AgentId[],
    required: true,
  });
  if (p.isCancel(res)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }
  return res as AgentId[];
}

export function nextSteps(dir: string, entry: string): void {
  p.outro(
    `Done. Open ${dir}/${entry} in your agent and say hi.\nAdd a domain: ${TOOL_NAME} add domain <name>`,
  );
}
