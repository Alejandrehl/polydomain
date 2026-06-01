import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { render } from "../core/tokens.js";
import { FIXED } from "../templates/fixed.js";

const VALID = ["notes", "obsidian"] as const;
type RefType = (typeof VALID)[number];

export function addReferenceTo(root: string, type: string): void {
  if (!VALID.includes(type as RefType)) {
    throw new Error(
      `Unknown references type: "${type}". Valid: notes, obsidian`,
    );
  }
  if (!existsSync(join(root, "domains/_registry.md"))) {
    throw new Error("Not a command center (domains/_registry.md missing).");
  }
  const v = { name: basename(root) };
  const dir = join(root, "references");
  mkdirSync(dir, { recursive: true });
  const core = join(dir, "notes-store.md");
  if (type === "notes") {
    if (existsSync(core))
      throw new Error("Reference already exists: references/notes-store.md");
    writeFileSync(core, render(FIXED.notesStore, v), "utf8");
    return;
  }
  // obsidian: ensure the shared core exists, then add the specialization
  if (!existsSync(core))
    writeFileSync(core, render(FIXED.notesStore, v), "utf8");
  const obs = join(dir, "obsidian.md");
  if (existsSync(obs))
    throw new Error("Reference already exists: references/obsidian.md");
  writeFileSync(obs, render(FIXED.obsidian, v), "utf8");
}

export async function runAddReference(type: string): Promise<void> {
  addReferenceTo(process.cwd(), type);
  console.log(`Added reference "${type}".`);
}
