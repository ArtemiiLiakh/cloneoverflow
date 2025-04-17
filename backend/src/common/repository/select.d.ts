export type Select<T> = {
  [K in keyof T]?: boolean
};
