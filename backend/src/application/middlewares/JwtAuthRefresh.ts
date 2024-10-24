import config from '@/config';
import { AuthPayload } from '@app/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@app/auth/data/TokenPayload';
import { ForbiddenException, UnauthorizedException, UserStatus } from '@cloneoverflow/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const JwtAuthRefresh = (status = UserStatus.USER) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies['refreshToken'];

    jwt.verify(
      refreshToken,
      config.jwt.TOKEN_SECRET, 
      (err, decode) => {
        if (err) {
          throw new UnauthorizedException();
        }
  
        const payload = plainToInstance(TokenPayload, decode);
        
        if (validateSync(payload).length) {
          throw new UnauthorizedException();
        }

        if (!((payload.status === status || payload.status === UserStatus.ADMIN) && payload.type === TokenType.REFRESH)) {
          throw new ForbiddenException();
        }
  
        req.body._user = {
          userId: payload.userId,
          status: payload.status,
        } as AuthPayload;
        
        next();
      }
    );
  };
}