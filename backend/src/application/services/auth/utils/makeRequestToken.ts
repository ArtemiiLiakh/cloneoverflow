import config from '@/config';
import { DataEncryptor, EncryptOptions } from '@application/interfaces/security/DataEncryptor';
import { AuthPayload, TokenPayload, TokenType } from '../data';

export const makeRefreshToken = (
  dataEncryptor: DataEncryptor,
  { userId, status }: AuthPayload,
  options: EncryptOptions = {},
) => {
  options.expiresIn = options.expiresIn ?? config.jwt.refreshToken.maxAge;

  return dataEncryptor.encrypt<TokenPayload>({
    userId,
    status,
    type: TokenType.REFRESH,
  }, options).then((res) => res ?? '');
};