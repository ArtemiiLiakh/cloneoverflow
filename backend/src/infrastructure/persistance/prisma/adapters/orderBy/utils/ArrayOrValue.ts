export const ArrayOrValue = <T, M>(value: T | T[], map: (value: T) => M) => {
  if (Array.isArray(value)) {
    return value.map(map);
  }
  return map(value);
};