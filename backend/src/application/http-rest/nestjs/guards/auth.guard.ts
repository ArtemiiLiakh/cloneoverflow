import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { AuthUserValidator } from '@application/services/validators';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ValidatorDITokens } from '../di/tokens/ValidatorDITokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    @Inject(ValidatorDITokens.AuthUserValidator) private authValidator: AuthUserValidator,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req: ExpressRequest = http.getRequest();

    await this.authValidator.validate({ 
      executor: req.body._user!,
    });

    return true;
  }
}