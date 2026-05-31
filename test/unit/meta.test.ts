import { describe, expect, it } from "vitest";
import { TOOL_NAME, VERSION } from "../../src/meta.js";
describe("meta", () => {
  it("reads name and version from package.json", () => {
    expect(typeof TOOL_NAME).toBe("string");
    expect(TOOL_NAME.length).toBeGreaterThan(0);
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });
});
