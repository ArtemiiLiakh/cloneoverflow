export type NumberType = number | number[] | {
  eq?: number;
  ls?: number;
  gt?: number;
  leq?: number;
  geq?: number;
  in?: number[];
};