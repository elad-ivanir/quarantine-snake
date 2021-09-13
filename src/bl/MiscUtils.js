export function createObject(keys, defaultValue) {
  return keys.reduce(
    (obj, nextKey) => ({
      ...obj,
      [nextKey]: defaultValue,
    }),
    {}
  );
}
