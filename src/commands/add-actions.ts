import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { render } from "../core/tokens.js";
import { ACTIONS_MACOS } from "../templates/actions.js";

const VALID = ["macos"] as const;
type Platform = (typeof VALID)[number];

export function addActionsTo(root: string, platform: string): void {
  if (!VALID.includes(platform as Platform)) {
    throw new Error(`Unknown actions platform: "${platform}". Valid: macos`);
  }
  if (!existsSync(join(root, "domains/_registry.md"))) {
    throw new Error("Not a command center (domains/_registry.md missing).");
  }
  const dir = join(root, "actions");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${platform}.md`);
  if (existsSync(file)) {
    throw new Error(`Actions capsule already exists: actions/${platform}.md`);
  }
  writeFileSync(file, render(ACTIONS_MACOS, { name: basename(root) }), "utf8");
}

export async function runAddActions(platform: string): Promise<void> {
  addActionsTo(process.cwd(), platform);
  console.log(`Added actions capsule "${platform}".`);
}
