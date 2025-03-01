import { Module } from '@nestjs/common';
import { DataHasherProvider } from '../di/providers/encryption/DataHasherProvider';
import { JwtEncryptorProvider } from '../di/providers/encryption/DataEncryptorProvider';

@Module({
  providers: [
    JwtEncryptorProvider,
    DataHasherProvider,
  ],
  exports: [
    JwtEncryptorProvider,
    DataHasherProvider,
  ],
})
export class EncryptionModule {}