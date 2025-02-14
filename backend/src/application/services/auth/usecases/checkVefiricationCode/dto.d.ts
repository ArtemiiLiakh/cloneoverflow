import { VerificationCodeType } from '@cloneoverflow/common';

export type CheckVerificationCodeInput = {
  email: string,
  code: string,
  codeType: VerificationCodeType,
}

export type CheckVerificationCodeOutput = void;