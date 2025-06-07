import { SendVerificationCodeUseCase } from '@application/auth/usecases';
import { CacheRepository } from '@application/cache/CacheRepository';
import { DataHasher } from '@common/encryption/DataHasher';
import { EmailService } from '@common/services/EmailService';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { EmailServiceDITokens } from '@web/di/tokens/EmailServiceDITokens';
import { DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';

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