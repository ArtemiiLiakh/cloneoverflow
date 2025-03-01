import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { createParamDecorator } from '@nestjs/common';

export const Executor = createParamDecorator((data, context) => {
  const req: ExpressRequest = context.switchToHttp().getRequest();
  return req.body._user;
});