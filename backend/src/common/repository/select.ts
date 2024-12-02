import { MissingKeys } from '@common/utils/types';

export type Select<Entity> = Partial<Record<keyof Entity, true>>;
export type SelectResult<S extends Select<Entity>, Entity> = Omit<Entity, MissingKeys<Entity, S>>