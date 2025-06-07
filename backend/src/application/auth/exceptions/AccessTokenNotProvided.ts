import { UnauthorizedException } from '@cloneoverflow/common';

export class AccessTokenNotProvided extends UnauthorizedException {
  constructor () {
    super('Access token is not provided');
  }
}