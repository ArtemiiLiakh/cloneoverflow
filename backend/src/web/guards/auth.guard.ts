import { ExpressRequest } from '@web/types/ExpressRequest';
import { UserUnauthorized } from '@application/auth/exceptions';
import { IAuthUserValidator } from '@application/validators/types';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidatorDITokens } from '../di/tokens/ValidatorDITokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    @Inject(ValidatorDITokens.UserValidator) private userValidator: IAuthUserValidator,
    private reflector: Reflector,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req: ExpressRequest = http.getRequest();
    const isOptional = this.reflector.get('optional', context.getHandler());

    if (isOptional && !req.body?._user) return true;
    else if (!req.body._user) {
      throw new UserUnauthorized();
    }

    await this.userValidator.validate({
      userId: req.body._user.userId,
      status: req.body._user.status,
    });
    
    return true;
  }
}