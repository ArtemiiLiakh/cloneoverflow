export type SelectInput<T> = {
  [K in keyof T]?: boolean
};

export type SelectOutput<T> = Partial<T>;
