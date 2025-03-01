import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { CheckVerificationCodeUseCase } from '@application/services/auth/usecases';
import { IVerificationCodeValidator } from '@application/services/auth/usecases/validators/types';
import { UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const CheckVerificationCodeUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.CheckVerification,
  
  useFactory: (
    codeValidator: IVerificationCodeValidator,
    userRepository: UserRepository,
  ) => new CheckVerificationCodeUseCase(
    codeValidator,
    userRepository,
  ),
  
  inject: [
    ValidatorDITokens.VerificationCodeValidator,
    PrismaRepositoryDITokens.UserRepository,
  ],
};