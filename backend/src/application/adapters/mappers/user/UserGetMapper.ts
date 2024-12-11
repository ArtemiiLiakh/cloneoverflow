import { UserGetResponse } from '@cloneoverflow/common';
import { UserServiceOutput } from '@core/services/user/dtos/UserServiceOutput';

export function UserGetMapperOutput (user: UserServiceOutput.Get): UserGetResponse {
  return {
    id: user.entity.id,
    name: user.entity.name,
    username: user.entity.username,
    reputation: user.entity.rating,
    status: user.entity.status,
    about: user.entity.about,
    createdAt: user.entity.createdAt,
    updatedAt: user.entity.updatedAt,
    answersAmount: user.answersAmount,
    questionsAmount: user.questionsAmount,
  };
} 