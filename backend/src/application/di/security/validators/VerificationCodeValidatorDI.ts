import { VerificationCodeValidator } from '@application/auth/services/validators';
import { RedisCacheRepositoryDI } from '@application/di/repositories/RedisCacheRepositoryDI';
import { DataHasherDI } from '../hashers/DataHasherDI';

export const VerificationCodeValidatorDI = new VerificationCodeValidator(
  RedisCacheRepositoryDI, 
  DataHasherDI,
);