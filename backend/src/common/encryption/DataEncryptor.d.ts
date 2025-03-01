export interface EncryptOptions {
  expiresIn?: number;
}

export interface DataEncryptor {
  encrypt<P extends object>(value: P, options?: EncryptOptions): Promise<string | null>;
  decrypt<P>(value: string): Promise<P | null>;
}