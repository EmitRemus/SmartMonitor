export function isArraysEqual<A>(
  a: A[],
  b: A[],
  equalityFunction: (x: A, y: A) => boolean = (x, y) => x === y,
): boolean {
  if (a.length !== b.length) return false;
  const aSorted = Array.from(a).sort();
  const bSorted = Array.from(b).sort();

  return aSorted.every((_, i) => equalityFunction(aSorted[i], bSorted[i]));
}
