import { VerificationCodeValidator } from '@application/services/auth/usecases/validators';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';
import { ValidatorDITokens } from '../../tokens/ValidatorDITokens';
import { DataHasherDIToken } from '../../tokens/encryption/DataHasherDIToken';
import { RedisRepositoryDITokens } from '../../tokens/persistence/RepositoryDITokens';

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