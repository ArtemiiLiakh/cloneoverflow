import { CacheRepository } from '@application/cache/CacheRepository';
import { VerificationCodeValidator } from '@application/validators';
import { DataHasher } from '@common/encryption/DataHasher';
import { Provider } from '@nestjs/common';
import { DataHasherDIToken } from '@web/di/tokens/encryption';
import { RedisRepositoryDITokens } from '@web/di/tokens/persistence';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

export const VerificationCodeValidatorProvider: Provider = {
  provide: ValidatorDITokens.VerificationCodeValidator,
  
  useFactory: (
    cacheRepository: CacheRepository, 
    dataHasher: DataHasher,
  ) => new VerificationCodeValidator(cacheRepository, dataHasher),
  
  inject: [
    RedisRepositoryDITokens.CacheRepository, 
    DataHasherDIToken,
  ],
};