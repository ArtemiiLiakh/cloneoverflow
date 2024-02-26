import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../utils/exceptions/UnauthorizedExceptioin';
import { ForbiddenException } from '../utils/exceptions/ForbiddenExceptioin';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../types/TokenPayload';
import { validateSync } from 'class-validator'
import jwt from 'jsonwebtoken';
import config from '../config';

export const AuthAccess = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedException();
  }

  const access_token = authHeader.split(' ')[1];

  jwt.verify(
    access_token,
    config.TOKEN_SECRET, 
    (err, decode) => {
      if (err) {
        throw new ForbiddenException();
      }

      const payload = plainToInstance(TokenPayload, decode);
      
      if (validateSync(payload).length) {
        throw new ForbiddenException();
      }

      req.body["_user"] = payload;
      
      next();
    }
  );
};