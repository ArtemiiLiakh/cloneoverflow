import { NoEntityWithIdException } from '@cloneoverflow/common';

export class UserIdInvalid extends NoEntityWithIdException {
  constructor () {
    super('User');
  }
}