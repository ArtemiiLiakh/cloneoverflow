import { UserStatusEnum } from '@cloneoverflow/common';
import { Request } from 'express';

export interface ExpressRequest extends Request<unknown, unknown, unknown, unknown> {
  cookies: {
    refreshToken?: string | undefined;
    accessToken?: string | undefined;
  },
  body: {
    _user?: {
      userId: string,
      status: UserStatusEnum,
    },
  }
}