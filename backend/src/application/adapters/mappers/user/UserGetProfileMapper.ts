import { UserGetProfileResponse } from '@cloneoverflow/common';
import { UserServiceOutput } from '@core/service/user/dto/UserServiceOutput';

export function UserGetProfileMapperOutput (profile: UserServiceOutput.GetProfile): UserGetProfileResponse {
  const bestAnswer: UserGetProfileResponse['bestAnswer'] = profile.bestAnswer ? {
    id: profile.bestAnswer.entity.id,
    text: profile.bestAnswer.entity.text,
    rate: profile.bestAnswer.entity.rate,
    isSolution: profile.bestAnswer.entity.isSolution,
    createdAt: profile.bestAnswer.entity.createdAt,
    updatedAt: profile.bestAnswer.entity.updatedAt,
    question: {
      id: profile.bestAnswer.question.id,
      title: profile.bestAnswer.question.title,
    },
  } : null;

  const bestQuestion: UserGetProfileResponse['bestQuestion'] = profile.bestQuestion ? {
    id: profile.bestQuestion.entity.id,
    rate: profile.bestQuestion.entity.rate,
    title: profile.bestQuestion.entity.title,
    isClosed: profile.bestQuestion.entity.isClosed,
    answersAmount: profile.bestQuestion.answersAmount,
    tags: profile.bestQuestion.tags.map(tag => tag.text),
    createdAt: profile.bestQuestion.entity.createdAt,
    updatedAt: profile.bestQuestion.entity.updatedAt,
  } : null;
  
  return {
    id: profile.user.id,
    name: profile.user.name,
    username: profile.user.username,
    reputation: profile.user.reputation,
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