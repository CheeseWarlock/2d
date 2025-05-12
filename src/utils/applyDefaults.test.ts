import applyDefaults, { DeepPartial } from "./applyDefaults";

type Options = {
  x: number;
  y: number;
  color: {
    hex: string;
    name: string;
  };
};

const DEFAULTS: Options = {
  x: 1,
  y: 2,
  color: {
    hex: "#fff",
    name: "white",
  },
};

const OVERRIDES: DeepPartial<Options> = {
  x: 3,
  color: {
    name: "blanc",
  },
};

describe("applyDefaults", () => {
  it("should return defaults when no overrides are provided", () => {
    const result = applyDefaults(DEFAULTS);
    expect(result).toEqual(DEFAULTS);
  });

  it("should override top-level properties", () => {
    const defaults = { a: 1, b: 2 };
    const overrides = { a: 3 };
    const result = applyDefaults(defaults, overrides);
    expect(result).toEqual({ a: 3, b: 2 });
  });

  it("should deep-merge properties", () => {
    const result = applyDefaults(DEFAULTS, OVERRIDES);
    expect(result).toEqual({
      x: 3,
      y: 2,
      color: {
        hex: "#fff",
        name: "blanc",
      },
    });
  });

  it("should handle overriding with null", () => {
    const defaults: { a: number; b: { c: number } | null } = {
      a: 1,
      b: { c: 2 },
    };
    const overrides = { b: null };
    const result = applyDefaults(defaults, overrides);
    expect(result).toEqual({ a: 1, b: null });
  });

  it("should not modify the original defaults object", () => {
    const defaults = { a: 1, b: { c: 2 } };
    const overrides = { b: { c: 3 } };
    const result = applyDefaults(defaults, overrides);
    expect(result).not.toBe(defaults);
    expect(defaults).toEqual({ a: 1, b: { c: 2 } });
  });

  it("should handle array properties without merging them", () => {
    const defaults = { a: [1, 2, 3] };
    const overrides = { a: [4, 5] };
    const result = applyDefaults(defaults, overrides);
    expect(result).toEqual({ a: [4, 5] });
  });
});
