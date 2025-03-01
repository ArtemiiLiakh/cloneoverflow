import { CoreResponse } from '@application/controllers/types/Response';
import { Response } from 'express';

export const AdaptResponse = (res: Response) => {
  const resAdapt: CoreResponse = {
    send: res.send.bind(res),
    setCookie (name, value) {
      res.cookie(name, value);
    },
    status: res.status.bind(res),
  };

  return resAdapt;
};