import { Validator } from '@common/utils/validator';

export interface FieldValidator<T = unknown> extends Validator<T, boolean> {
  message: string;
}