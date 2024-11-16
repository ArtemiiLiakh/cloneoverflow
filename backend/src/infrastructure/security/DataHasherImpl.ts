import { DataHasher } from '@application/interfaces/security/DataHasher';
import { BinaryLike, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt);

export class DataHasherImpl implements DataHasher {
  async hash (value: string, salt?: string) {
    salt = salt ?? randomBytes(16).toString('hex');
    const hashBuffer = await scryptAsync(value, salt, 64);
    return `${hashBuffer.toString('hex')}.${salt}`;
  }

  async compareHash (value: string, hashValue: string): Promise<boolean> {
    const salt = hashValue.split('.').at(1);
    return hashValue === await this.hash(value, salt);
  }
}