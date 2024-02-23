import { Request } from 'express';

export interface RequestBody<B=any> extends Request {
  body: B;
}