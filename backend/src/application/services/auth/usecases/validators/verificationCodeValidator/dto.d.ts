import { VerificationCodeType } from '@cloneoverflow/common';

export type VerificationCodeValidatorInput = {
  userId: string,
  code: string,
  codeType: VerificationCodeType,
};

export type VerificationCodeValidatorOutput = void;