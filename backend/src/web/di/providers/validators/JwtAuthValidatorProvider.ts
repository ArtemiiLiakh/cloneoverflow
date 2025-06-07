import { AuthJwtValidator } from '@application/validators';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { Provider } from '@nestjs/common';
import { DataEncryptorDITokens } from '../../tokens/encryption/DataEncryptorDITokens';
import { ValidatorDITokens } from '../../tokens/ValidatorDITokens';

export const JwtAuthValidatorProvider: Provider = {
  provide: ValidatorDITokens.AuthJwtValidator,
  useFactory: (jwtEncryptor: DataEncryptor) => new AuthJwtValidator(jwtEncryptor),
  inject: [DataEncryptorDITokens.JwtEncryptor],
};