import { Where } from "./where";

export type IncludeRelations<I> = {
  [K in keyof I]?: I[K] extends any[] ? boolean | Where<I[K]> : boolean
};
