import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = join(mkdtempSync(join(tmpdir(), "smoke-")), "center");
execFileSync(
  process.execPath,
  ["dist/cli.js", "init", dir, "--yes", "--agent", "claude", "--no-git"],
  { stdio: "inherit" },
);
for (const f of [
  "CLAUDE.md",
  "domains/work.md",
  "memory/MEMORY.md",
  "SECURITY.md",
]) {
  if (!existsSync(join(dir, f))) {
    console.error("MISSING", f);
    process.exit(1);
  }
}
console.log("smoke ok");
