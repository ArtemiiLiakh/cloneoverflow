import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { AuthUserValidator } from '@application/middlewares/validators';

export const AuthUserValidatorDI = new AuthUserValidator(PrismaUserRepositoryDI);