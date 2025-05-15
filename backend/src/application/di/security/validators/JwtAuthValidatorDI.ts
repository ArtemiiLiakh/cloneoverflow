import { JwtAuthValidator } from '@application/middlewares/validators/JwtAuthValidator';
import { JwtEncryptorDI } from '../JwtEncryptorDI';

export const JwtAuthValidatorDI = new JwtAuthValidator(JwtEncryptorDI);