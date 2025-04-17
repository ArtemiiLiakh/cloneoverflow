import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { AuthUserValidator } from '@application/services/validators';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidatorDITokens } from '../di/tokens/ValidatorDITokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    @Inject(ValidatorDITokens.AuthUserValidator) private authValidator: AuthUserValidator,
    private reflector: Reflector,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req: ExpressRequest = http.getRequest();
    const isOptional = this.reflector.get('optional', context.getHandler());

    try {
      await this.authValidator.validate({ 
        executor: req.body._user!,
      });
      return true;
    } catch (e: unknown) {
      if (isOptional) return true;
      throw e;
    }
  }
}