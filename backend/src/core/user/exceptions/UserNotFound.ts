import { NotFoundException } from '@cloneoverflow/common';

export class UserNotFound extends NotFoundException {
  constructor () {
    super('User not found');
  }
}