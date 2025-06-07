import { UnauthorizedException } from '@cloneoverflow/common';

export class RefreshTokenNotProvided extends UnauthorizedException {
  constructor () {
    super('Refresh token is not provided');
  }
}