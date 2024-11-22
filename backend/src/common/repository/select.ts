export type Select<Entity> = Partial<Record<keyof Entity, true>>;

type MissingKeys<T, U> = Exclude<keyof T, keyof U>;

export type SelectResult<S extends Select<Entity>, Entity> = Omit<Entity, MissingKeys<Entity, S>>