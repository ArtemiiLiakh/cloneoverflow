import { AuthServiceOutput } from '@application/auth/dtos/AuthServiceOutput';
import { AuthSignUpResponse } from '@cloneoverflow/common';

export function AuthSingUpMapperOutput (user: AuthServiceOutput.SignUp['user']): AuthSignUpResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}