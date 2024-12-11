import { UserGetProfileResponse } from '@cloneoverflow/common';
import { UserServiceOutput } from '@core/services/user/dtos/UserServiceOutput';

export function UserGetProfileMapperOutput (profile: UserServiceOutput.GetProfile): UserGetProfileResponse {
  const bestAnswer: UserGetProfileResponse['bestAnswer'] = profile.bestAnswer ? {
    id: profile.bestAnswer.entity.answerId,
    rate: profile.bestAnswer.entity.rating,
    isSolution: profile.bestAnswer.entity.isSolution,
    createdAt: profile.bestAnswer.entity.createdAt,
    question: {
      id: profile.bestAnswer.question.questionId,
      title: profile.bestAnswer.question.title,
    },
  } : null;

  const bestQuestion: UserGetProfileResponse['bestQuestion'] = profile.bestQuestion ? {
    id: profile.bestQuestion.entity.questionId,
    rate: profile.bestQuestion.entity.rating,
    title: profile.bestQuestion.entity.title,
    isClosed: profile.bestQuestion.entity.isClosed,
    answersAmount: profile.bestQuestion.answersAmount,
    tags: profile.bestQuestion.tags.map(tag => tag.name),
    createdAt: profile.bestQuestion.entity.createdAt,
  } : null;
  
  return {
    id: profile.user.id,
    name: profile.user.name,
    username: profile.user.username,
    reputation: profile.user.rating,
    about: profile.user.about,
    status: profile.user.status,
    createdAt: profile.user.createdAt,
    updatedAt: profile.user.updatedAt,
    answersAmount: profile.answersAmount,
    questionsAmount: profile.questionsAmount,
    bestAnswer,
    bestQuestion,
  };
}