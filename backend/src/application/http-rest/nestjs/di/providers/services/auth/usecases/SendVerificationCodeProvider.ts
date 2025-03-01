import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { EmailServiceDITokens } from '@application/http-rest/nestjs/di/tokens/EmailServiceDITokens';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { EmailService } from '@application/interfaces/EmailService';
import { SendVerificationCodeUseCase } from '@application/services/auth/usecases';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository, UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const SendVerificationCodeUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.SendVerificationCode,
  
  useFactory: (
    userRepository: UserRepository,
    emailService: EmailService,
    cacheRepository: CacheRepository,
    dataHasher: DataHasher,
  ) => new SendVerificationCodeUseCase(
    userRepository,
    emailService,
    cacheRepository,
    dataHasher,
  ),
  
  inject: [
    PrismaRepositoryDITokens.UserRepository,
    EmailServiceDITokens.Gmail,
    RedisRepositoryDITokens.CacheRepository,
    DataHasherDIToken,
  ],
};