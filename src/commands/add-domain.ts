import { appendFileSync, existsSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { render } from "../core/tokens.js";
import { CAPSULES } from "../templates/domains.js";

export function addDomainTo(root: string, name: string): void {
  const registry = join(root, "domains/_registry.md");
  if (!existsSync(registry))
    throw new Error("Not a command center (domains/_registry.md missing).");
  const capsule = join(root, `domains/${name}.md`);
  if (existsSync(capsule))
    throw new Error(`Capsule already exists: domains/${name}.md`);
  const workTemplate = CAPSULES["work"];
  const body = render(workTemplate ?? "", { name: basename(root) }).replace(
    /Work/g,
    name,
  );
  writeFileSync(capsule, body, "utf8");
  appendFileSync(
    registry,
    `| ${name} | this repo | \`domains/${name}.md\` |\n`,
  );
}

export async function runAddDomain(name: string): Promise<void> {
  addDomainTo(process.cwd(), name);
  console.log(`Added domain "${name}".`);
}
