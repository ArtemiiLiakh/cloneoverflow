import { Provider } from '@nestjs/common';
import { DataHasherDIToken } from '../../tokens/encryption/DataHasherDIToken';
import { DataHasherImpl } from '@infrastructure/encryption/DataHasherImpl';

export const DataHasherProvider: Provider = {
  provide: DataHasherDIToken,
  useFactory: () => new DataHasherImpl(),
};