import { UserGetResponse } from '@cloneoverflow/common';
import { UserServiceOutput } from '@core/service/user/dto/UserServiceOutput';

export function UserGetMapperOutput (user: UserServiceOutput.Get): UserGetResponse {
  return {
    id: user.entity.id,
    name: user.entity.name,
    username: user.entity.username,
    reputation: user.entity.reputation,
    status: user.entity.status,
    about: user.entity.about,
    createdAt: user.entity.createdAt,
    updatedAt: user.entity.updatedAt,
    answersAmount: user.answersAmount,
    questionsAmount: user.questionsAmount,
  };
} 