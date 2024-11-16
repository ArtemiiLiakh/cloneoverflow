import { Model } from '../model/Model';
import { StringType } from './Datatypes/StringType';
import { NumberType } from './Datatypes/NumberType';
import { DateType } from './Datatypes/DateType';

export type Where<I = unknown> = I extends (infer U)[] ? Where<U> : {
  [K in keyof I]?: I[K] extends string[] | string | null | undefined ? string | StringType :
                   I[K] extends number[] | number | null | undefined ? number | NumberType :
                   I[K] extends Date[]   | Date   | null | undefined ? Date | DateType : 
                   I[K] extends Model[]  | Model  | null | undefined ? Where<I[K]> : 
                   I[K]
} & {
  OR?: Where<I>[],
  AND?: Where<I>[],
};