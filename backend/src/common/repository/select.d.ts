export type SelectInput<T> = {
  [K in keyof T]?: boolean
};

export type SelectOutput<T> = T | Partial<T>;
