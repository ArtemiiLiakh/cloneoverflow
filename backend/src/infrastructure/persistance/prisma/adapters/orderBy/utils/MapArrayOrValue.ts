export const MapArrayOrValue = <T, M>(value: T | T[], map: (value: T) => M): M | M[] => {
  if (Array.isArray(value)) return value.map(map);
  return map(value);
};