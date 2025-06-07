import { UnauthorizedException } from '@cloneoverflow/common';

export class LoginException extends UnauthorizedException {  
  constructor () {
    super('Login exception. Email or password is wrong');
  }
}