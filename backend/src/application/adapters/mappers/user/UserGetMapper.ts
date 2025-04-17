import { UserGetResponse } from '@cloneoverflow/common';
import { UserGetOutput } from '@core/services/user/dtos';

export function UserGetMapperOutput (user: UserGetOutput): UserGetResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
} 