import { scrypt, randomBytes, BinaryLike } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt);

export const hash = async (value: string, salt?: string) => {
  salt = salt ?? randomBytes(16).toString('hex');
  const hashBuffer = await scryptAsync(value, salt, 64);
  return `${hashBuffer.toString('hex')}.${salt}`;
}

export const compare = async (value: string, hashValue: string) => {
  const [realValue, salt] = hashValue.split('.');
  return hashValue === await hash(value, salt);
}