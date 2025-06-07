import { Validator } from '@common/services/Validator';
import { AuthUserValidatorInput } from './dto';

export interface IAuthUserValidator extends Validator<AuthUserValidatorInput> {}
