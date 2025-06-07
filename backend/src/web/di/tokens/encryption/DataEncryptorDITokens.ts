import { JwtEncryptorImpl } from '@infrastructure/encryption/JwtEncryptorImpl';

export const DataEncryptorDITokens = {
  JwtEncryptor: Symbol(JwtEncryptorImpl.name),
};