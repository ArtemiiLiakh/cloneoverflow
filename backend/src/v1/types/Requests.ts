import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface Body<B=any> extends Request<unknown, any, unknown, unknown> {
  body: B;
}

export interface Query<Q extends {}> extends Request<unknown, unknown, unknown, any> {
  query: Q;
}

export interface Params<P extends {}> extends Request<any, unknown, unknown, unknown> {
  params: P;
}

export interface AuthRequest extends Request {
  body: {
    _user: TokenPayload;
  };
}