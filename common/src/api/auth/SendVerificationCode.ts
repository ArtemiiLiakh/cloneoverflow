import { VerificationCodeType } from '@enums/VerificationCodeType';
import { authPath } from './path';

export const SendVerificationCodePath = authPath+'/verificationCode';

export interface SendVerificationCodeBody {
  email: string;
  codeType: VerificationCodeType;
}