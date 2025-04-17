import { UserGetProfileResponse } from '@cloneoverflow/common';
import { UserGetProfileOutput } from '@core/services/user/dtos';

export function UserGetProfileMapperOutput (
  { user, bestAnswer, bestQuestion, answerAmount, questionAmount }: UserGetProfileOutput,
): UserGetProfileResponse {
  const answer: UserGetProfileResponse['bestAnswer'] = bestAnswer ? {
    id: bestAnswer.entity.answerId,
    rating: bestAnswer.entity.rating,
    isSolution: bestAnswer.entity.isSolution,
    createdAt: bestAnswer.entity.createdAt,
    question: {
      id: bestAnswer.question.questionId,
      ownerId: bestAnswer.question.ownerId,
      title: bestAnswer.question.title,
      rating: bestAnswer.question.rating,
    },
  } : null;

  const question: UserGetProfileResponse['bestQuestion'] = bestQuestion ? {
    id: bestQuestion.entity.questionId,
    rating: bestQuestion.entity.rating,
    title: bestQuestion.entity.title,
    isClosed: bestQuestion.entity.isClosed,
    answersAmount: bestQuestion.answersAmount,
    tags: bestQuestion.tags.map(tag => tag.name),
    createdAt: bestQuestion.entity.createdAt,
  } : null;
  
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
    about: user.about,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    answerAmount,
    questionAmount,
    bestAnswer: answer,
    bestQuestion: question,
  };
}