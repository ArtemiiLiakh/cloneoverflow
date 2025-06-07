import { UnauthorizedException } from '@cloneoverflow/common';

export class WrongRefreshToken extends UnauthorizedException {
  constructor () {
    super('Refresh token is wrong'); 
  }
}