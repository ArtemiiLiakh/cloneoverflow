import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface RequestWithBody<B=any> extends Request {
  body: B;
}

export interface AuthRequest<D extends { [key: string]: any } = any> extends Request {
  body: {
    _user: TokenPayload;
  } & D;
}