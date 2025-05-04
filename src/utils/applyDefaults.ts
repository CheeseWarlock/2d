type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Takes a set of default values and overrides for a subset of those values,
 * and deep-merges them.
 * @param defaults the default values that should be used when not overridden
 * @param overrides some values to override the defaults with
 * @returns an object with all the keys of defaults, with overridden values
 */
function applyDefaults<T extends Record<string, any>>(
  defaults: T,
  overrides?: DeepPartial<T>
): T {
  const result: T = { ...defaults };

  for (const key in overrides) {
    if (
      overrides[key] != null &&
      typeof overrides[key] === "object" &&
      !Array.isArray(overrides[key])
    ) {
      result[key] = applyDefaults(result[key], overrides[key]);
    } else {
      result[key] = overrides[key] as T[typeof key];
    }
  }

  return result;
}

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

const merged = applyDefaults<Options>(DEFAULTS, OVERRIDES);

export default applyDefaults;
