import { ExecutorPayload } from '@application/services/auth/data';
import { Request } from 'express';

export interface ExpressRequest extends Request<unknown, unknown, unknown, unknown> {
  cookies: {
    refreshToken?: string | undefined;
    accessToken?: string | undefined;
  },
  body: {
    _user?: ExecutorPayload,
  }
}