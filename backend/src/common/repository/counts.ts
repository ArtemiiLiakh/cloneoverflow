import { Where } from './where';

export type CountOption<I> = {
  [K in keyof I as I[K] extends unknown[] | undefined ? K : never]?: boolean | Where<I[K]>
}

export type CountResult<I> = {
  counts: {
    [K in keyof I as I[K] extends unknown[] | undefined ? K : never]: number | undefined;
  }
}