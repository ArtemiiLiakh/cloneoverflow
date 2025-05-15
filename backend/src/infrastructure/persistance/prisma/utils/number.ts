export const parseNumberOrArray = (value?: string | string[]): number | number[] | undefined => {
  if (value === undefined) return;
  if (Array.isArray(value)) return value.map(v => +v);
  return parseInt(value, 10);
};