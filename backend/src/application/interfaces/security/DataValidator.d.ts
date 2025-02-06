import { Validator } from '@common/services/Validator';

export interface DataValidator<T = unknown> extends Validator<T, boolean> {
  message: string;
}