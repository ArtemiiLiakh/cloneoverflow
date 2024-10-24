export interface EncryptOptions {
  expiresIn?: number;
}

export interface DataEncryptor {
  encrypt<P>(value: P, options?: EncryptOptions): string;
  decrypt<P>(value: string): P | null;
}