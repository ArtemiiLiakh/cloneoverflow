import { CoreResponse, CoreResponseData } from '@common/controllers/Response';
import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';

export const CoreRes = createParamDecorator((data, context): CoreResponse => {
  let res: Response = context.switchToHttp().getResponse();
  return {
    async process<TData> (response: CoreResponseData<TData> | Promise<CoreResponseData<TData>>): Promise<TData> {
      const { data, cookies, status } = await response;

      if (cookies) {
        for (const key of Object.keys(cookies)) {
          res = res.cookie(key, cookies[key]);    
        }
      }
      res.status(status ?? 200);
      return data;
    },
  };
});