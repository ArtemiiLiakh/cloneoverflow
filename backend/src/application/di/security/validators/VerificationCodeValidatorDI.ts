import { RedisCacheRepositoryDI } from '@application/di/repositories/RedisCacheRepositoryDI';
import { VerificationCodeValidator } from '@application/services/auth/usecases/validators';
import { DataHasherDI } from '../hashers/DataHasherDI';

export const VerificationCodeValidatorDI = new VerificationCodeValidator(
  RedisCacheRepositoryDI, 
  DataHasherDI,
);