import { BasicType } from './BasicType';

export type DateOptions = {
  eq?: Date;
  ls?: Date;
  gt?: Date;
  geq?: Date;
  leq?: Date;
  in?: Date[];
};

export type DateType = BasicType<Date> | DateOptions;