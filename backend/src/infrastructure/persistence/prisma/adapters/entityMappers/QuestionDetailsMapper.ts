import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Nullable } from '@common/utils/classTypes';
import { QuestionDetails } from '@core/question/QuestionDetails';
import { QuestionOwner } from '@core/question/QuestionOwner';
import { QuestionVoter } from '@core/question/QuestionVoter';
import Prisma from '@prisma/client';
import { TagMapper } from './TagMapper';

export class QuestionDetailsMapper {
  static toEntity (
    question: Prisma.Question, 
    owner: Nullable<Prisma.User>,
    voter: Nullable<Prisma.QuestionVoter>,
    tags: Prisma.Tag[],
    isFavorite: boolean,
  ): QuestionDetails {
    return QuestionDetails.new({
      questionId: question.id.toString(),
      ownerId: question.ownerId ?? '',
      title: question.title,
      text: question.text,
      rating: question.rating,
      views: question.views,
      isClosed: question.isClosed,
      isFavorite,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,

      owner: owner ? QuestionOwner.new({
        userId: owner.id,
        questionId: question.id.toString(),
        name: owner.name,
        username: owner.username,
        rating: owner.rating,
        status: owner.status as UserStatusEnum,
      }) : null,

      voter: voter ? QuestionVoter.new({
        id: voter.id.toString(),
        userId: voter.userId,
        questionId: voter.questionId.toString(),
        voteType: voter.voteType as VoteTypeEnum,
      }) : null,

      tags: tags.map(TagMapper.toEntity),
    });
  };
}