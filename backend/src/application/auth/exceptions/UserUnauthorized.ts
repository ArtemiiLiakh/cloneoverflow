import { UnauthorizedException } from '@cloneoverflow/common';

export class UserUnauthorized extends UnauthorizedException {
  constructor () {
    super('User is unauthorized');
  }
}