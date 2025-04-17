export interface DataHasher {
  hash(value: string): Promise<string> | string;
  compareHash(value: string, hashValue: string): Promise<boolean> | boolean;
}