import { NotFoundException } from '@cloneoverflow/common';

export class UserCredentialsNotFound extends NotFoundException {
  constructor () {
    super('User credentials not found');
  }
}