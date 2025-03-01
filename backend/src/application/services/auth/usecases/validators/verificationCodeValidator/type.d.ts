import { Validator } from '@common/services/Validator';
import { VerificationCodeValidatorInput } from './dto';

export interface IVerificationCodeValidator extends Validator<
  VerificationCodeValidatorInput
> {}