import { AuthUserStatusValidator } from '@application/middlewares/security/auth/AuthUserStatusValidator';
import { ValidateUserUseCaseDI } from '../../services/ValidationServiceDI';

export const AuthUserStatusValidatorDI = new AuthUserStatusValidator(
  ValidateUserUseCaseDI,
);