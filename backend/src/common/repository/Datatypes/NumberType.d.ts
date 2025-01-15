import { BasicType } from './BasicType';

export type NumberOptions = {
  eq?: number;
  ls?: number;
  gt?: number;
  leq?: number;
  geq?: number;
  in?: number[];
};

export type NumberType = BasicType<number> | NumberOptions;