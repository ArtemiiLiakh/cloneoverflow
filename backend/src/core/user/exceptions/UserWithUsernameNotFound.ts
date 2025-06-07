import { NotFoundException } from '@cloneoverflow/common';

export class UserWithUsernameNotFound extends NotFoundException {
  constructor () {
    super('User with provided username not found');
  }
}