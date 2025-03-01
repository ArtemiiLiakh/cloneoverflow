import { AdaptResponse } from '@application/adapters/AdaptResponse';
import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';

export const CoreRes = createParamDecorator((data, context) => {
  const res: Response = context.switchToHttp().getResponse();
  return AdaptResponse(res);
});