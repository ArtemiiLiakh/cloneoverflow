import { ForbiddenException } from '@cloneoverflow/common';

export class AccountBlockedException extends ForbiddenException {
  constructor () {
    super('Your account is blocked');
  }
}