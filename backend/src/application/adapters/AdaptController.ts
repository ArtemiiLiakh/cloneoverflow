import { CoreRequest, WithAuth } from "@app/controllers/types/Request";
import { CoreResponse } from "@app/controllers/types/Response";
import { NextFunction, Request, Response } from "express";

export const AdaptController = (fn: (req: WithAuth & CoreRequest<any, any, any, any>, res: CoreResponse) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn({
      body: req.body,
      query: req.query,
      params: req.params,
      user: req.body._user,
      cookies: req.cookies,
    }, {
      send: res.send.bind(res),
      setCookie(name, value) {
        res.cookie(name, value);
      },
      status: res.status.bind(res),
    });
  }
}