import { BasicType } from './BasicType';

export type StringOptions = {
  eq?: string;
  contains?: string;
  in?: string[];
  ignoreCase?: boolean;
};

export type StringType = BasicType<string> | StringOptions;