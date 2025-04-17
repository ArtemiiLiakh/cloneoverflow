import config from '@/config';
import { DataEncryptor, EncryptOptions } from '@common/encryption/DataEncryptor';
import { ExecutorPayload, TokenPayload, TokenTypeEnum } from '../data';

export const makeAccessToken = (
  dataEncryptor: DataEncryptor,
  { userId, status }: ExecutorPayload,
  options: EncryptOptions = {},
): Promise<string> => {
  options.expiresIn = options.expiresIn ?? config.jwt.accessToken.maxAge;

  return dataEncryptor.encrypt<TokenPayload>({
    userId,
    status,
    type: TokenTypeEnum.ACCESS,
  }, options).then((res) => res ?? '');
};