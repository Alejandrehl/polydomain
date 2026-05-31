import { appendFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { assertSafeDomainName } from "../core/scaffold.js";
import { genericCapsule, registryRow } from "../templates/domains.js";

export function addDomainTo(root: string, name: string): void {
  assertSafeDomainName(name);
  const registry = join(root, "domains/_registry.md");
  if (!existsSync(registry))
    throw new Error("Not a command center (domains/_registry.md missing).");
  const capsule = join(root, `domains/${name}.md`);
  if (existsSync(capsule))
    throw new Error(`Capsule already exists: domains/${name}.md`);
  writeFileSync(capsule, genericCapsule(name), "utf8");
  appendFileSync(registry, registryRow(name));
}

export async function runAddDomain(name: string): Promise<void> {
  addDomainTo(process.cwd(), name);
  console.log(`Added domain "${name}".`);
}
