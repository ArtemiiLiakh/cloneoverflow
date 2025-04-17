import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Nullable } from '@common/utils/classTypes';
import { AnswerDetails } from '@core/models/answer/AnswerDetails';
import { AnswerOwner } from '@core/models/answer/AnswerOwner';
import { AnswerVoter } from '@core/models/answer/AnswerVoter';
import Prisma from '@prisma/client';

export class AnswerDetailsMapper {
  static toEntity (
    answer: Prisma.Answer, 
    owner: Nullable<Prisma.User>, 
    voter: Nullable<Prisma.AnswerVoter>,
  ): AnswerDetails {
    return AnswerDetails.new({
      answerId: answer.id.toString(),
      questionId: answer.questionId.toString(),
      ownerId: answer.ownerId ?? '',
      text: answer.text,
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      
      owner: owner ? AnswerOwner.new({
        userId: owner.id,
        answerId: answer.id.toString(),
        name: owner.name,
        username: owner.username,
        rating: owner.rating,
        status: owner.status as UserStatusEnum,
      }) : null,

      voter: voter ? AnswerVoter.new({
        id: voter.id.toString(),
        userId: voter.userId,
        answerId: voter.answerId.toString(),
        voteType: voter.voteType as VoteTypeEnum,
      }) : null,
    });
  }
}