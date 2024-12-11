import { AuthServiceOutput } from '@application/auth/dtos/AuthServiceOutput';
import { AuthGetMeResponse } from '@cloneoverflow/common';

export function AuthGetMeMapperOutput (user: AuthServiceOutput.GetMe): AuthGetMeResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}