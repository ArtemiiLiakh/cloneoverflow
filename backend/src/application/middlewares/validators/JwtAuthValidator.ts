import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { AuthPayload, TokenPayload, TokenType } from '@application/services/auth/data';
import { ForbiddenException, UnauthorizedException } from '@cloneoverflow/common';
import { JwtEncryptorImpl } from '@infrastructure/security/JwtEncryptorImpl';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response } from 'express';

interface MiddlewarePayload {
  tokenType: TokenType,
  optional?: boolean,
}

export class JwtAuthValidator implements MiddlewareValidator<MiddlewarePayload> {
  constructor (
    private jwtEncryptor: JwtEncryptorImpl,
  ) {}

  validate (payload?: MiddlewarePayload) {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      let token: string | undefined;        
      
      const tokenType = payload?.tokenType;
      const isOptional = payload?.optional;

      if (!tokenType) {
        await this.validateBothTokens()(req, res, next);
        return;
      }

      if (tokenType === TokenType.ACCESS) {
        token = req.cookies.accessToken;
      } 
      else if (tokenType === TokenType.REFRESH) {
        token = req.cookies.refreshToken;
      }

      if (!token && isOptional) {
        next();
        return;
      }

      if (!token) {
        throw new UnauthorizedException('No authorization token provided');
      }

      const decode = await this.jwtEncryptor.decrypt<TokenPayload>(token).catch(() => { 
        throw new UnauthorizedException('Authorization token is wrong'); 
      });
      
      const tokenPayload = plainToInstance(TokenPayload, decode);
      
      if ((await validate(tokenPayload)).length) {
        throw new UnauthorizedException('Authorization token is invalid');
      }

      if (tokenPayload.type !== tokenType) {
        throw new ForbiddenException('Authorization token type is wrong');
      }
      
      req.body._user = {
        userId: tokenPayload.userId,
        status: tokenPayload.status,
      } as AuthPayload;
      
      next();
    };
  }

  private validateBothTokens () {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      if (!req.cookies.accessToken || !req.cookies.refreshToken) {
        throw new UnauthorizedException('No authorization tokens provided');
      }

      const accessDecode = await this.jwtEncryptor.decrypt<TokenPayload>(req.cookies.accessToken).catch(() => { 
        throw new UnauthorizedException('Access token is wrong'); 
      });

      const refreshDecode = await this.jwtEncryptor.decrypt<TokenPayload>(req.cookies.refreshToken).catch(() => { 
        throw new UnauthorizedException('Refresh token is wrong'); 
      });

      const accessPayload = plainToInstance(TokenPayload, accessDecode);
      const refreshPayload = plainToInstance(TokenPayload, refreshDecode);

      if ((await validate(accessPayload)).length) {
        throw new UnauthorizedException('Access token is invalid');
      }

      if ((await validate(refreshPayload)).length) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      if (accessPayload.userId !== refreshPayload.userId) {
        throw new ForbiddenException('Authorization tokens are wrong');
      }

      req.body._user = {
        userId: accessPayload.userId,
        status: refreshPayload.status,
      } as AuthPayload;

      next();
    };
  }

  validateAccess (args?: { optional?: boolean }) {
    return this.validate({ tokenType: TokenType.ACCESS, optional: args?.optional });
  }
  
  validateRefresh () {
    return this.validate({ tokenType: TokenType.REFRESH });
  }
}