import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { JwtAuthValidator } from '@application/services/validators';
import { UnauthorizedException } from '@cloneoverflow/common';
import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidatorDITokens } from '../di/tokens/ValidatorDITokens';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor (
    @Inject(ValidatorDITokens.JwtAuthValidator) private jwtValidator: JwtAuthValidator,
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
          throw new ForbiddenException('Authorization tokens are not compatible');
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
      throw new UnauthorizedException('Access token is not provided');
    }

    const executor = await this.jwtValidator.validate({ 
      token: accessToken, 
      tokenType: TokenTypeEnum.ACCESS,
    }).catch(() => { 
      throw new UnauthorizedException('Access token is wrong'); 
    });

    return executor;
  }

  private async checkRefreshToken (refreshToken?: string): Promise<ExecutorPayload> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not provided');
    }

    const executor = await this.jwtValidator.validate({ 
      token: refreshToken, 
      tokenType: TokenTypeEnum.REFRESH,
    }).catch(() => { 
      throw new UnauthorizedException('Refresh token is wrong'); 
    });

    return executor;
  }
}