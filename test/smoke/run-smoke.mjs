// Smoke test of the BUILT binary (dist/cli.js) — exercises the CLI dispatch,
// the happy paths, and the error paths (which exit non-zero with a clean message).
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Absolute path so the CLI resolves even when we run commands with cwd set to a center.
const CLI = join(dirname(fileURLToPath(import.meta.url)), "../../dist/cli.js");
let failures = 0;
const fail = (msg) => {
  console.error("FAIL:", msg);
  failures++;
};

const run = (args, opts = {}) =>
  execFileSync(process.execPath, [CLI, ...args], { encoding: "utf8", ...opts });

const runExpectError = (args, opts = {}) => {
  try {
    run(args, { stdio: "pipe", ...opts });
    return null; // exited 0 — unexpected for an error case
  } catch (e) {
    return { status: e.status, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
};

// 1. init (happy path)
const dir = join(mkdtempSync(join(tmpdir(), "smoke-")), "center");
run(["init", dir, "--yes", "--agent", "claude", "--no-git"], {
  stdio: "inherit",
});
for (const f of [
  "CLAUDE.md",
  "domains/_registry.md",
  "domains/work.md",
  "domains/side-project.md",
  "memory/MEMORY.md",
  "workspace/.gitkeep",
  "governance.md",
  "GUIDE.md",
  "SECURITY.md",
  ".gitignore",
]) {
  if (!existsSync(join(dir, f))) fail(`init: missing ${f}`);
}

// 2. add domain (in the center)
run(["add", "domain", "clients"], { cwd: dir, stdio: "pipe" });
if (!existsSync(join(dir, "domains/clients.md")))
  fail("add domain: capsule not created");
if (
  !readFileSync(join(dir, "domains/_registry.md"), "utf8").includes(
    "domains/clients.md",
  )
)
  fail("add domain: registry row missing");

// 3. add agent (in the center)
run(["add", "agent", "gemini"], { cwd: dir, stdio: "pipe" });
if (!existsSync(join(dir, "GEMINI.md")))
  fail("add agent: entrypoint not created");

// 4. --version prints a semver
const ver = run(["--version"], { stdio: "pipe" });
if (!/\d+\.\d+\.\d+/.test(ver)) fail(`--version: unexpected output: ${ver}`);

// 5. error: unknown agent -> non-zero + message
const fresh = join(mkdtempSync(join(tmpdir(), "smoke-")), "sub");
const e1 = runExpectError([
  "init",
  fresh,
  "--yes",
  "--agent",
  "bogus",
  "--no-git",
]);
if (!e1 || e1.status === 0 || !/unknown agent/i.test(e1.out))
  fail("unknown agent should exit non-zero with a clear message");

// 6. error: add domain outside a command center
const bare = mkdtempSync(join(tmpdir(), "bare-"));
const e2 = runExpectError(["add", "domain", "x"], { cwd: bare });
if (!e2 || e2.status === 0 || !/not a command center/i.test(e2.out))
  fail("add domain outside a center should fail");

// 7. error: unknown kind
const e3 = runExpectError(["add", "foo", "bar"], { cwd: dir });
if (!e3 || e3.status === 0 || !/unknown kind/i.test(e3.out))
  fail("unknown kind should fail");

// 8. error: unknown top-level command -> non-zero + message (not a silent no-op)
const e4 = runExpectError(["frobnicate"]);
if (!e4 || e4.status === 0 || !/unknown command/i.test(e4.out))
  fail("unknown command should exit non-zero with a clear message");

// 9. init --references obsidian scaffolds both capsules
const od = join(mkdtempSync(join(tmpdir(), "smoke-")), "obs");
run(
  [
    "init",
    od,
    "--yes",
    "--agent",
    "claude",
    "--references",
    "obsidian",
    "--no-git",
  ],
  { stdio: "pipe" },
);
for (const f of ["references/notes-store.md", "references/obsidian.md"]) {
  if (!existsSync(join(od, f))) fail(`references: missing ${f}`);
}

// 10. error: unknown references type
const e5 = runExpectError([
  "init",
  join(mkdtempSync(join(tmpdir(), "smoke-")), "x"),
  "--yes",
  "--references",
  "bogus",
  "--no-git",
]);
if (!e5 || e5.status === 0 || !/unknown references type/i.test(e5.out))
  fail("unknown references type should exit non-zero with a message");

if (failures > 0) {
  console.error(`smoke FAILED (${failures} check(s))`);
  process.exit(1);
}
console.log("smoke ok");
