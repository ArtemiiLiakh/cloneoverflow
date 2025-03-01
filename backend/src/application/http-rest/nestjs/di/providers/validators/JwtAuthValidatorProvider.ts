import { Provider } from '@nestjs/common';
import { ValidatorDITokens } from '../../tokens/ValidatorDITokens';
import { JwtAuthValidator } from '@application/services/validators';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { DataEncryptorDITokens } from '../../tokens/encryption/DataEncryptorDITokens';

export const JwtAuthValidatorProvider: Provider = {
  provide: ValidatorDITokens.JwtAuthValidator,
  useFactory: (jwtEncryptor: DataEncryptor) => new JwtAuthValidator(jwtEncryptor),
  inject: [DataEncryptorDITokens.JwtEncryptor],
};