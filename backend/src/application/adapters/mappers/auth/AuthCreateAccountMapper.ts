import { CreateAccountOutput } from '@application/auth/services/createAccount/dto';
import { AuthSignUpResponse } from '@cloneoverflow/common';

export function AuthCreateAccountMapperOutput (user: CreateAccountOutput['user']): AuthSignUpResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}