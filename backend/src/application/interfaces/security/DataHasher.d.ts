export interface DataHasher {
  hash(value: string, salt?: string): Promise<string>;
  compareHash(value: string, hashValue: string): Promise<boolean>;
}