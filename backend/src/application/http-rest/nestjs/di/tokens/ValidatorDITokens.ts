import { AuthUserValidator, JwtAuthValidator } from '@application/services/validators';
import { VerificationCodeValidator } from '@application/services/auth/usecases/validators';
import { UserRatingValidator } from '@core/services/validators';

export const ValidatorDITokens = {
  AuthUserValidator: Symbol(AuthUserValidator.name),
  JwtAuthValidator: Symbol(JwtAuthValidator.name),
  UserRatingValidator: Symbol(UserRatingValidator.name),
  VerificationCodeValidator: Symbol(VerificationCodeValidator.name),
};