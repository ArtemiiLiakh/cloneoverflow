import { UserStatusEnum } from '@cloneoverflow/common';
import { QuestionOwner } from '@core/question/QuestionOwner';
import Prisma from '@prisma/client';

export const QuestionOwnerMapper = (questionId: string, owner: Prisma.User): QuestionOwner => {
  return QuestionOwner.new({
    userId: owner.id,
    questionId,
    name: owner.name,
    username: owner.username,
    rating: owner.rating,
    status: owner.status as UserStatusEnum,
  });
};