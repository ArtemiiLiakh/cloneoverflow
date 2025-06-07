import { BadBodyException } from '@cloneoverflow/common';

export class VerificationCodeNotMatch extends BadBodyException {
  constructor () {
    super('Verification code does not match');
  }
}