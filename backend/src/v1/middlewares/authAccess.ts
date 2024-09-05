import { ForbiddenException, UnauthorizedException } from '@cloneoverflow/common';
import { UserStatus } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from '../types/TokenPayload';

export const AuthAccess = (status: UserStatus = 'USER') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies['access_token'];
  
    jwt.verify(
      access_token,
      config.TOKEN_SECRET, 
      (err, decode) => {
        if (err) {
          throw new UnauthorizedException();
        }
  
        const payload = plainToInstance(TokenPayload, decode);
        
        if (validateSync(payload).length) {
          throw new UnauthorizedException();
        }

        if (!(payload.status === status || payload.status === 'ADMIN')) {
          throw new ForbiddenException();
        }
  
        req.body._user = payload;
        
        next();
      }
    );
  };
}

export const GetAuth = (status: UserStatus = 'USER') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies['access_token'];
  
    jwt.verify(
      access_token,
      config.TOKEN_SECRET, 
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