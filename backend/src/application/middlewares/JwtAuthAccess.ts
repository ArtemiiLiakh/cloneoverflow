import config from '@/config';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { AuthPayload } from '@app/auth/data/AuthPayload';
import { TokenPayload, TokenType } from '@app/auth/data/TokenPayload';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const JwtAuthAccess = (status = UserStatusEnum.USER) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['accessToken'];

    jwt.verify(
      accessToken,
      config.jwt.TOKEN_SECRET, 
      (err, decode) => {
        if (err) {
          throw new UnauthorizedException();
        }
  
        const payload = plainToInstance(TokenPayload, decode);
        
        if (validateSync(payload).length) {
          throw new UnauthorizedException();
        }

        if (!((payload.status === status || payload.status === UserStatusEnum.ADMIN) && payload.type === TokenType.ACCESS)) {
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

export const JwtGetAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies['access_token'];
    jwt.verify(
      access_token,
      config.jwt.TOKEN_SECRET, 
      (err, decode) => {
        if (!err) {
          const payload = plainToInstance(TokenPayload, decode);
          req.body._user = payload;
        }
        
        next();
      }
    );
  };
}