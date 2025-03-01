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

    const req: ExpressRequest = http.getRequest();

    let executor: ExecutorPayload;

    if (tokenType === TokenTypeEnum.ACCESS) {
      if (!req.cookies.accessToken) {
        throw new UnauthorizedException('Access token is not provided');
      }

      executor = await this.jwtValidator.validate({ 
        token: req.cookies.accessToken, 
        tokenType,
      }).catch(() => { 
        throw new UnauthorizedException('Access token is wrong'); 
      });
    }
    
    else if (tokenType === TokenTypeEnum.REFRESH) {
      if (!req.cookies.refreshToken) {
        throw new UnauthorizedException('Refresh token is not provided');
      }

      executor = await this.jwtValidator.validate({
        token: req.cookies.refreshToken,
        tokenType,
      }).catch(() => { 
        throw new UnauthorizedException('Refresh token is wrong'); 
      });
      
    } else {
      if (!req.cookies.accessToken) {
        throw new UnauthorizedException('Access token is not provided');
      }
      
      if (!req.cookies.refreshToken) {
        throw new UnauthorizedException('Refresh token is not provided');
      }

      executor = await this.jwtValidator.validate({ 
        token: req.cookies.accessToken, 
        tokenType: TokenTypeEnum.ACCESS,
      }).catch(() => { 
        throw new UnauthorizedException('Access token is wrong'); 
      });

      const refreshExecutor = await this.jwtValidator.validate({ 
        token: req.cookies.refreshToken, 
        tokenType: TokenTypeEnum.REFRESH,
      }).catch(() => { 
        throw new UnauthorizedException('Refresh token is wrong'); 
      });

      if (executor.userId !== refreshExecutor.userId) {
        throw new ForbiddenException('Authorization tokens are not compatible');
      }
    }

    req.body = {
      ...req.body,
      _user: executor,
    };
    
    return true;
  }
}