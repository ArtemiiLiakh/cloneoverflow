import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Answer, AnswerDetails, AnswerOwner, AnswerVoter } from '@core/answer';

export const createAnswer = (params?: Partial<Answer>): Answer => {
  return Answer.new({
    answerId: params?.answerId ?? 'answerId',
    questionId: params?.questionId ?? 'questionId',
    ownerId: params?.ownerId ?? 'ownerId',
    text: params?.text ?? 'text',
    rating: params?.rating ?? 0,
    isSolution: params?.isSolution ?? false,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
  });
}

export const createAnswerVoter = (params?: Partial<AnswerVoter>): AnswerVoter => {
  return AnswerVoter.new({
    id: params?.id ?? 'id',
    answerId: params?.answerId ?? 'answerId',
    userId: params?.userId ?? 'userId',
    voteType: params?.voteType ?? VoteTypeEnum.EMPTY,
  });
}

export const createAnswerOwner = (params?: Partial<AnswerOwner>): AnswerOwner => {
  return AnswerOwner.new({
    userId: params?.userId ?? 'userId',
    answerId: params?.answerId ?? 'answerId',
    name: params?.name ?? 'name',
    username: params?.username ?? 'username',
    rating: params?.rating ?? 0,
    status: params?.status ?? UserStatusEnum.USER,
  });
};

export const createAnswerDetails = (params?: Partial<AnswerDetails>): AnswerDetails => {
  return AnswerDetails.new({
    answerId: params?.answerId ?? 'answerId',
    ownerId: params?.ownerId ?? 'ownerId',
    questionId: params?.questionId ?? 'questionId',
    text: params?.text ?? 'text',
    rating: params?.rating ?? 0,
    isSolution: params?.isSolution ?? false,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
    owner: params?.owner ?? createAnswerOwner(),
    voter: params?.voter ?? createAnswerVoter(),
  }); 
}