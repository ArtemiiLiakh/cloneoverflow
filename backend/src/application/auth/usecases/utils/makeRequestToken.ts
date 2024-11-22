import { AuthPayload } from '@application/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@application/auth/data/TokenPayload';
import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import config from '@/config';

export const makeRefreshToken = (
  dataEncryptor: DataEncryptor,
  payload: AuthPayload,
) => {
  return dataEncryptor.encrypt<TokenPayload>({
    userId: payload.userId,
    status: payload.status,
    type: TokenType.REFRESH,
  }, {
    expiresIn: config.jwt.refreshToken.maxAge,
  }).then((res) => res ?? '');
};