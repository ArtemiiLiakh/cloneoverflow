import config from '@/config';
import { DataEncryptor, EncryptOptions } from '@application/interfaces/security/DataEncryptor';
import { AuthPayload, TokenPayload, TokenType } from '../data';

export const makeAccessToken = (
  dataEncryptor: DataEncryptor,
  { userId, status }: AuthPayload,
  options: EncryptOptions = {},
) => {
  options.expiresIn = options.expiresIn ?? config.jwt.accessToken.maxAge;

  return dataEncryptor.encrypt<TokenPayload>({
    userId,
    status,
    type: TokenType.ACCESS,
  }, options).then((res) => res ?? '');
};