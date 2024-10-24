export type RepositoryMapper<T extends { [K in keyof T]: (...args) => Promise<any> }> = {
  [K in keyof T]?: (...args) => Awaited<ReturnType<T[K]>>;
};