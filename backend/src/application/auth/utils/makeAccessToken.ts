import { AuthPayload } from '@application/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@application/auth/data/TokenPayload';
import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import config from '@/config';

export const makeAccessToken = (
  dataEncryptor: DataEncryptor,
  { userId, status }: AuthPayload,
) => {
  return dataEncryptor.encrypt<TokenPayload>({
    userId,
    status,
    type: TokenType.ACCESS,
  }, {
    expiresIn: config.jwt.accessToken.maxAge,
  }).then((res) => res ?? '');
};