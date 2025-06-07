import { BadBodyException } from '@cloneoverflow/common';

export class MissingVerificationCode extends BadBodyException {
  constructor () {
    super('Missing verification code');
  }
}