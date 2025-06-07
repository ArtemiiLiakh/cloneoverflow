import { AuthJwtValidator, UserRatingValidator, AuthUserValidator, VerificationCodeValidator } from '@application/validators';

export const ValidatorDITokens = {
  UserValidator: Symbol(AuthUserValidator.name),
  AuthJwtValidator: Symbol(AuthJwtValidator.name),
  UserRatingValidator: Symbol(UserRatingValidator.name),
  VerificationCodeValidator: Symbol(VerificationCodeValidator.name),
};