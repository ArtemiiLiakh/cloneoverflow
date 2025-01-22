export const parseNumberOrArray = (value?: string | string[]): number | number[] | undefined => {
  if (!value) return;
  if (Array.isArray(value)) return value.map(v => +v);
  return +value;
};