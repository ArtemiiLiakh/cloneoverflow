import { Where } from './where';

export type IncludeRelations<I> = {
  [K in keyof I]?: I[K] extends unknown[] ? boolean | Where<I[K]> : boolean
};
