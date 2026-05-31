import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { name: string; version: string };
export const TOOL_NAME = pkg.name;
export const VERSION = pkg.version;
