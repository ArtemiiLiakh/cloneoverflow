import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Question, QuestionDetails, QuestionOwner, QuestionViewer, QuestionVoter } from '@core/models/question';

export const createQuestion = (params?: Partial<Question>): Question => {
  return Question.new({
    questionId: params?.questionId ?? 'questionId',
    ownerId: params?.ownerId ?? 'ownerId',
    title: params?.title ?? 'title',
    text: params?.text ?? 'text',
    rating: params?.rating ?? 0,
    views: params?.views ?? 0,
    isClosed: params?.isClosed ?? false,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
  });
};

export const createQuestionVoter = (params?: Partial<QuestionVoter>): QuestionVoter => {
  return QuestionVoter.new({
    id: params?.id ?? 'id',
    questionId: params?.questionId ?? 'questionId',
    userId: params?.userId ?? 'userId',
    voteType: params?.voteType ?? VoteTypeEnum.EMPTY,
  });
}

export const createQuesitonViewer = (params?: Partial<QuestionViewer>): QuestionViewer => {
  return QuestionViewer.new({
    id: params?.id ?? 'id',
    questionId: params?.questionId ?? 'questionId',
    userId: params?.userId ?? 'userId',
  });
};

export const createQuestionOwner = (params?: Partial<QuestionOwner>): QuestionOwner => {
  return QuestionOwner.new({
    userId: params?.userId ?? 'userId',
    questionId: params?.questionId ?? 'questionId',
    username: params?.username ?? 'username',
    name: params?.name ?? 'name',
    rating: params?.rating ?? 0,
    status: params?.status ?? UserStatusEnum.USER,
  });
};

export const createQuestionDetails = (params?: Partial<QuestionDetails>): QuestionDetails => {
  return QuestionDetails.new({
    questionId: params?.questionId ?? 'questionId',
    ownerId: params?.ownerId ?? 'ownerId',
    title: params?.title ?? 'title',
    text: params?.text ?? 'text',
    rating: params?.rating ?? 0,
    views: params?.views ?? 0,
    isClosed: params?.isClosed ?? false,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
    owner: params?.owner ?? createQuestionOwner(),
    tags: params?.tags ?? [],
    voter: params?.voter ?? createQuestionVoter(),
  });
};