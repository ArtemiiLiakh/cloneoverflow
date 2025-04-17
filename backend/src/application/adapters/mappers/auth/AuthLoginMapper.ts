import { LoginOutput } from '@application/services/auth/usecases/login/dto';
import { AuthLoginResponse } from '@cloneoverflow/common';

export function AuthLoginMapperOutput (user: LoginOutput['user']): AuthLoginResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}