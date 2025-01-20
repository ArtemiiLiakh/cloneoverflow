import { VerificationCodeType } from '@cloneoverflow/common';

export type SendVerificationCodeInput = {
  email: string;
  codeType: VerificationCodeType,
};

export type SendVerificationCodeOutput = void;
