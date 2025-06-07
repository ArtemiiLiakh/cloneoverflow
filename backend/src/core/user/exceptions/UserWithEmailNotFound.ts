import { NotFoundException } from '@cloneoverflow/common';

export class UserWithEmailNotFound extends NotFoundException {
  constructor () {
    super('User with provided email is not found');
  }
}