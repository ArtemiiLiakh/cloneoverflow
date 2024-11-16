import { AuthPayload } from '@application/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@application/auth/data/TokenPayload';
import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { JwtEncryptorImpl } from '@infrastructure/security/JwtEncryptorImpl';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Response } from 'express';

export const JwtAuthRefresh = (status = UserStatusEnum.USER) => {
  return async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const decode = await new JwtEncryptorImpl().decrypt<TokenPayload>(refreshToken).catch(() => { 
      throw new UnauthorizedException; 
    });

    const payload = plainToInstance(TokenPayload, decode);
    
    if (validateSync(payload).length) {
      throw new UnauthorizedException();
    }

    if (!((payload.status === status || payload.status === UserStatusEnum.ADMIN) && payload.type === TokenType.REFRESH)) {
      throw new ForbiddenException();
    }

    req.body._user = {
      userId: payload.userId,
      status: payload.status,
    } as AuthPayload;
    
    next();
  };
};