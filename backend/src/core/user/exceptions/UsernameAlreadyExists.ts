import { ForbiddenException } from '@cloneoverflow/common';

export class UsernameAlreadyExists extends ForbiddenException {
  constructor () {
    super('User with this username already exists');
  }
}