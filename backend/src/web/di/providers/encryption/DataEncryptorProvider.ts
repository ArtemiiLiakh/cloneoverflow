import { Provider } from '@nestjs/common';
import { DataEncryptorDITokens } from '../../tokens/encryption/DataEncryptorDITokens';
import { JwtEncryptorImpl } from '@infrastructure/encryption/JwtEncryptorImpl';

export const JwtEncryptorProvider: Provider = {
  provide: DataEncryptorDITokens.JwtEncryptor,
  useFactory: () => new JwtEncryptorImpl(),
};