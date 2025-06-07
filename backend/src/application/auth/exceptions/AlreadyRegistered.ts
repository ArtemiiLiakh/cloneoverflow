import { ForbiddenException } from '@cloneoverflow/common';

export class AlreadyRegisteredException extends ForbiddenException {
  constructor () {
    super('User with these credentials is already registered');
  }
}