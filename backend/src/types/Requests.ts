import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface Body<B=any> extends Request {
  body: B;
}

export interface Query<Q extends {}> extends Request {
  query: Q;
}

export interface Params<P extends {}> extends Request {
  params: P;
}

export interface AuthRequest extends Request {
  body: {
    _user: TokenPayload;
  };
}