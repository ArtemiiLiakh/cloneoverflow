import { Where } from "./where";

export type IncludeRelations<I> = {
  [K in keyof I]?: I[K] extends any[] ? true | Where<I[K]> : true
};
