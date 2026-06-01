import { cac } from "cac";
import { runAddActions } from "./commands/add-actions.js";
import { runAddAgent } from "./commands/add-agent.js";
import { runAddDomain } from "./commands/add-domain.js";
import { runAddReference } from "./commands/add-reference.js";
import { runAdopt } from "./commands/adopt.js";
import { runInit } from "./commands/init.js";
import { TOOL_NAME, VERSION } from "./meta.js";

const cli = cac(TOOL_NAME);

cli
  .command("init [dir]", "Scaffold a command center")
  .option("--agent <list>", "Target agent(s): claude,codex,gemini,cursor")
  .option("--domains <spec>", "minimal|standard|full or a comma list")
  .option("--with-references", "Alias for --references notes")
  .option("--references <type>", "Notes store capsule: notes|obsidian")
  .option("--actions <platform>", "Actions capsule: macos")
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
        references: o.references as string,
        actions: o.actions as string,
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
  .command(
    "add <kind> <value>",
    "Add a domain, an agent, a reference, or actions",
  )
  .action(async (kind: string, value: string) => {
    try {
      if (kind === "domain") await runAddDomain(value);
      else if (kind === "agent") await runAddAgent(value);
      else if (kind === "reference") await runAddReference(value);
      else if (kind === "actions") await runAddActions(value);
      else {
        console.error(
          `Unknown kind: "${kind}". Valid: domain, agent, reference, actions`,
        );
        process.exit(1);
      }
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  });

cli
  .command("adopt", "Adopt the polydomain standard in an existing repo")
  .action(async () => {
    try {
      await runAdopt();
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  });

cli.help();
cli.version(VERSION);

// cac auto-prints --version/--help during parse(); we only handle command dispatch.
const parsed = cli.parse(process.argv, { run: false });
if (cli.matchedCommand) {
  await cli.runMatchedCommand();
} else if (!parsed.options.version && !parsed.options.help) {
  if (parsed.args.length > 0) {
    console.error(
      `Unknown command: "${parsed.args[0]}". Run \`${TOOL_NAME} --help\` to see available commands.`,
    );
    process.exit(1);
  }
  cli.outputHelp();
}
