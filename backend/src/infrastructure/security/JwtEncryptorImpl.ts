import { EncryptOptions, DataEncryptor } from "@app/interfaces/security/DataEncryptor";
import jwt from 'jsonwebtoken';
import config from "@/config";

export class JwtEncryptorImpl implements DataEncryptor {
  encrypt(value: any, options?: EncryptOptions): string {
    return jwt.sign(value, config.jwt.TOKEN_SECRET, {
      expiresIn: options?.expiresIn,
    });
  }

  decrypt(token: string) {
    try {
      return jwt.verify(token, config.jwt.TOKEN_SECRET) as any;
    } catch (err) {
      return null;
    }
  }
}