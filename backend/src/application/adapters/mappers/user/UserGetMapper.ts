import { UserGetResponse } from '@cloneoverflow/common';
import { UserGetOutput } from '@core/services/user/dtos';

export function UserGetMapperOutput (user: UserGetOutput): UserGetResponse {
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