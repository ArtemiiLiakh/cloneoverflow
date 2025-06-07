import { UnauthorizedException } from '@cloneoverflow/common';

export class WrongAccessToken extends UnauthorizedException {
  constructor () {
    super('Access token is wrong'); 
  }
}