import { DataHasher } from '@common/encryption/DataHasher';
import { randomBytes, createHash } from 'crypto';

export class DataHasherImpl implements DataHasher {
  async hash (value: string, salt?: string) {
    const hash = createHash('sha256');
    
    salt = salt ?? randomBytes(12).toString('base64');

    return hash.update(value+salt).digest('base64')+'.'+salt;
  }

  async compareHash (value: string, hashValue: string): Promise<boolean> {
    const salt = hashValue.split('.').at(1);
    return hashValue === await this.hash(value, salt);
  }
}