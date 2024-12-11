import { AuthServiceOutput } from '@application/auth/dtos/AuthServiceOutput';
import { AuthLoginResponse } from '@cloneoverflow/common';

export function AuthLoginMapperOutput (user: AuthServiceOutput.Login['user']): AuthLoginResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}