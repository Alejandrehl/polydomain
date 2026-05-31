import { cac } from "cac";
import { runAddAgent } from "./commands/add-agent.js";
import { runAddDomain } from "./commands/add-domain.js";
import { runInit } from "./commands/init.js";
import { TOOL_NAME, VERSION } from "./meta.js";

const cli = cac(TOOL_NAME);

cli
  .command("init [dir]", "Scaffold a command center")
  .option("--agent <list>", "Target agent(s): claude,codex,gemini,cursor")
  .option("--domains <spec>", "minimal|standard|full or a comma list")
  .option("--with-references", "Include the external-store capsule")
  .option("--no-memory", "Skip the memory system")
  .option("--no-git", "Skip git init")
  .option("--force", "Write into a non-empty directory")
  .option("-y, --yes", "Accept all defaults, no prompts")
  .action(async (dir: string | undefined, o: Record<string, unknown>) => {
    try {
      await runInit({
        dir: dir ?? ".",
        yes: o.yes as boolean,
        agent: o.agent as string,
        domains: o.domains as string,
        withReferences: o.withReferences as boolean,
        noMemory: o.memory === false,
        noGit: o.git === false,
        force: o.force as boolean,
      });
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  });

cli
  .command("add <kind> <value>", "Add a domain or an agent")
  .action(async (kind: string, value: string) => {
    try {
      if (kind === "domain") await runAddDomain(value);
      else if (kind === "agent") await runAddAgent(value);
      else {
        console.error(`Unknown kind: "${kind}". Valid: domain, agent`);
        process.exit(1);
      }
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  });

cli.help();
cli.version(VERSION);
cli.parse();
