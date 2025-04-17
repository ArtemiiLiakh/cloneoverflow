import { DataHasher } from '@common/encryption/DataHasher';
import { randomBytes, createHash } from 'crypto';

export class DataHasherImpl implements DataHasher {
  hash (value: string, salt?: string): string {
    const hash = createHash('sha256');
    
    salt = salt ?? randomBytes(12).toString('base64');

    return hash.update(value+salt).digest('base64')+'.'+salt;
  }

  compareHash (value: string, hashValue: string): boolean {
    const salt = hashValue.split('.').at(1);
    return hashValue === this.hash(value, salt);
  }
}