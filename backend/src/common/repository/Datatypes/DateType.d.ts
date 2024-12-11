export type DateType = Date | Date[] | {
  eq?: Date;
  ls?: Date;
  gt?: Date;
  geq?: Date;
  leq?: Date;
  in?: Date[];
};