import { describe, expect, it } from "vitest";
import { render } from "../../src/core/tokens.js";

describe("render", () => {
  it("replaces {{key}} tokens", () => {
    expect(render("Hi {{name}}!", { name: "deck" })).toBe("Hi deck!");
  });
  it("replaces all occurrences", () => {
    expect(render("{{a}}-{{a}}", { a: "x" })).toBe("x-x");
  });
  it("throws on an unknown token to prevent silent gaps", () => {
    expect(() => render("{{missing}}", {})).toThrow(/missing/);
  });
});
