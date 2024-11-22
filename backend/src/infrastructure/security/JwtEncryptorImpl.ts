import config from '@/config';
import { DataEncryptor, EncryptOptions } from '@application/interfaces/security/DataEncryptor';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const jwtSignAsync = promisify(
  <P extends object>(value: P, options: EncryptOptions | undefined, callback: jwt.SignCallback) => jwt.sign(
    value, 
    config.jwt.TOKEN_SECRET, 
    {
      expiresIn: options?.expiresIn,
    }, 
    callback,
  ),
);

const jwtVerifyAsync = promisify(
  (token: string, callback: jwt.VerifyCallback) => jwt.verify(
    token, 
    config.jwt.TOKEN_SECRET,
    callback,
  ),
);

export class JwtEncryptorImpl implements DataEncryptor {
  encrypt<P extends object> (value: P, options?: EncryptOptions) {
    return jwtSignAsync(value, options).then((res) => res ?? null);
  }

  decrypt<P> (token: string) {
    return jwtVerifyAsync(token).then((res) => res as P ?? null);
  }
}