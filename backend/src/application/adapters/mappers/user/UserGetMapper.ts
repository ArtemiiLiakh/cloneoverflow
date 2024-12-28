import { UserGetResponse } from '@cloneoverflow/common';
import { UserServiceOutput } from '@core/services/user/dtos/UserServiceOutput';

export function UserGetMapperOutput (user: UserServiceOutput.Get): UserGetResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
    about: user.about,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
} 