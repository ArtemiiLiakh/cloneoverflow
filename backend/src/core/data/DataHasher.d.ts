export interface DataHasher {
  hash(value: string): Promise<string>;
  compareHash(value: string, hashValue: string): Promise<boolean>;
}