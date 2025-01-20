import { SignUpOutput } from '@application/auth/services/signup/dto';
import { AuthSignUpResponse } from '@cloneoverflow/common';

export function AuthSingUpMapperOutput (user: SignUpOutput['user']): AuthSignUpResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}