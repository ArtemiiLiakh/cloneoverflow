import { Where } from "./where";

export type CountOption<I = unknown> = {
  [K in keyof I as I[K] extends any[] | undefined ? K : never]?: boolean | Where<I>
}

export type CountResult<I = unknown> = {
  counts: {
    [K in keyof I as I[K] extends any[] | undefined ? K : never]: number | undefined;
  }
}