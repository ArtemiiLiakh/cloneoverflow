import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { AuthPayload } from '@application/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@application/auth/data/TokenPayload';
import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { ForbiddenException, UnauthorizedException } from '@cloneoverflow/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response } from 'express';

interface ValidatorPayload {
  tokenType: TokenType,
  optional?: boolean,
}

export class JwtTokenValidator implements MiddlewareValidator<ValidatorPayload> {
  constructor (
    private dataEncryptor: DataEncryptor,
  ) {}

  validate ({
    tokenType,
    optional,
  }: ValidatorPayload) {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      let token: string | undefined;        
      
      if (tokenType === TokenType.ACCESS) {
        token = req.cookies.accessToken;
      } 
      else if (tokenType === TokenType.REFRESH) {
        token = req.cookies.refreshToken;
      }

      if (!token && optional) {
        next();
        return;
      }

      if (!token) {
        throw new UnauthorizedException();
      }

      const decode = await this.dataEncryptor.decrypt<TokenPayload>(token).catch(() => { 
        throw new UnauthorizedException; 
      });
      
      const payload = plainToInstance(TokenPayload, decode);
      
      if ((await validate(payload)).length) {
        throw new UnauthorizedException();
      }

      if (payload.type !== tokenType) {
        throw new ForbiddenException();
      }
      
      req.body._user = {
        userId: payload.userId,
        status: payload.status,
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