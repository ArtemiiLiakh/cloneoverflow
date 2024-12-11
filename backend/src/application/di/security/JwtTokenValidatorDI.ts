import { JwtTokenValidator } from '@application/middlewares/security/JwtTokenValidator';
import { JwtEncryptorDI } from './JwtEncryptorDI';

export const JwtTokenValidatorDI = new JwtTokenValidator(
  JwtEncryptorDI,
);