import { CoreResponse } from '@application/controllers/types/Response';
import { Response } from 'express';

export const AdaptResponse = (res: Response): CoreResponse => {
  return {
    send: res.send.bind(res),
    setCookie: (name, value): void => {
      res.cookie(name, value);
    },
    status: res.status.bind(res),
  };
};