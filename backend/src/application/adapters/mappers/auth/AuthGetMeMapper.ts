import { AuthServiceOutput } from '@application/auth/dto/AuthServiceOutput';
import { AuthGetMeResponse } from '@cloneoverflow/common';

export function AuthGetMeMapperOutput (user: AuthServiceOutput.GetMe): AuthGetMeResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.reputation,
    status: user.status,
  };
}