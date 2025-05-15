import { CoreRequest, WithAuth, WithOptionalAuth } from '@application/controllers/types/Request';
import { CoreResponse } from '@application/controllers/types/Response';
import { Response } from 'express';
import { ExpressRequest } from './types/ExpressRequest';

export const AdaptController = <Auth extends WithAuth | WithOptionalAuth>(
  fn: (req: Auth & CoreRequest, res: CoreResponse) => Promise<void>,
) => {
  return (req: ExpressRequest, res: Response) => {
    const reqAdapted = {
      body: req.body,
      query: req.query,
      params: req.params,
      executor: req.body._user,
      cookies: req.cookies,
    } as CoreRequest & Auth;

    const resAdapted: CoreResponse = {
      send: res.send.bind(res),
      setCookie (name, value) {
        res.cookie(name, value);
      },
      status: res.status.bind(res),
    };

    return fn(reqAdapted, resAdapted);
  };
};