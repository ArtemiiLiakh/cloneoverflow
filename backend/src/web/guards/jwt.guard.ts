import { ExpressRequest } from '@web/types/ExpressRequest';
import { ExecutorPayload, TokenTypeEnum } from '@application/auth/data';
import { AuthJwtValidator } from '@application/validators';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidatorDITokens } from '../di/tokens/ValidatorDITokens';

import {
  AccessTokenNotProvided,
  RefreshTokenNotProvided,
  TokensIncompatible,
  WrongAccessToken,
  WrongRefreshToken,
} from '@application/auth/exceptions';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor (
    @Inject(ValidatorDITokens.AuthJwtValidator) private jwtValidator: AuthJwtValidator,
    private reflector: Reflector,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const tokenType: TokenTypeEnum = this.reflector.get('tokenType', context.getHandler());
    const isOptional = this.reflector.get('optional', context.getHandler());

    const req: ExpressRequest = http.getRequest();

    let executor: ExecutorPayload;

    try {
      if (tokenType === TokenTypeEnum.ACCESS) {
        executor = await this.checkAccessToken(req.cookies.accessToken);
      } else if (tokenType === TokenTypeEnum.REFRESH) {
        executor = await this.checkRefreshToken(req.cookies.refreshToken);
      } else {
        executor = await this.checkAccessToken(req.cookies.accessToken);
        const refreshExecutor = await this.checkRefreshToken(req.cookies.refreshToken);
  
        if (executor.userId !== refreshExecutor.userId) {
          throw new TokensIncompatible();
        }
      }
  
      req.body = {
        ...req.body,
        _user: executor,
      };

      return true;
    } catch (e: unknown) {
      if (isOptional) return true;
      throw e;
    }
  }

  private async checkAccessToken (accessToken?: string): Promise<ExecutorPayload> {
    if (!accessToken) {
      throw new AccessTokenNotProvided();
    }

    const executor = await this.jwtValidator.validate({ 
      token: accessToken, 
      tokenType: TokenTypeEnum.ACCESS,
    }).catch(() => { 
      throw new WrongAccessToken(); 
    });

    return executor;
  }

  private async checkRefreshToken (refreshToken?: string): Promise<ExecutorPayload> {
    if (!refreshToken) {
      throw new RefreshTokenNotProvided();
    }

    const executor = await this.jwtValidator.validate({ 
      token: refreshToken, 
      tokenType: TokenTypeEnum.REFRESH,
    }).catch(() => { 
      throw new WrongRefreshToken(); 
    });

    return executor;
  }
}