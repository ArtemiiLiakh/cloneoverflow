import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { AuthUserValidator } from '@application/middlewares/security/auth/AuthUserValidator';

export const AuthUserValidatorDI = new AuthUserValidator(
  PrismaUserRepositoryDI,
);