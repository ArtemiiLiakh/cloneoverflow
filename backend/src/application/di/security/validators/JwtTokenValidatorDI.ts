import { JwtTokenValidator } from '@application/middlewares/validators/JwtTokenValidator';
import { JwtEncryptorDI } from '../JwtEncryptorDI';

export const JwtTokenValidatorDI = new JwtTokenValidator(JwtEncryptorDI);