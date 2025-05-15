import { ValidatorUseCase } from '@common/services/Validator';
import { VerificationCodeValidatorInput, VerificationCodeValidatorOutput } from './dto';

export interface IVerificationCodeValidator extends ValidatorUseCase<
  VerificationCodeValidatorInput,
  VerificationCodeValidatorOutput
> {}