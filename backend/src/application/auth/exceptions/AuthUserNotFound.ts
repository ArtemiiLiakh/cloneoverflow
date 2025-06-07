import { NotFoundException } from '@cloneoverflow/common';

export class AuthUserNotFound extends NotFoundException {
  constructor () {
    super('User with provided token was not found');
  }
}