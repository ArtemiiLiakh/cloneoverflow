import { DataHasher } from '@core/data/DataHasher';
import { BinaryLike, randomBytes, scrypt, ScryptOptions } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify<BinaryLike, BinaryLike, number, ScryptOptions, Buffer>(scrypt);

export class ScryptHasherImpl implements DataHasher {
  async hash (value: string, salt?: string) {
    salt = salt ?? randomBytes(12).toString('base64');
    const hashBuffer = await scryptAsync(value, salt, 32, {});
    return `${hashBuffer.toString('base64')}.${salt}`;
  }

  async compareHash (value: string, hashValue: string): Promise<boolean> {
    const salt = hashValue.split('.').at(1);
    return hashValue === await this.hash(value, salt);
  }
}